import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, Storage } from '@angular/fire/storage';
import { IPromoResponse } from 'src/app/shared/interfaces/promo.interface';
import { PromoService } from 'src/app/shared/services/promo/promo.service';
import { ref, uploadBytesResumable } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-promotions',
  templateUrl: './admin-promotions.component.html',
  styleUrls: ['../admin.component.scss']
})
export class AdminPromotionsComponent implements OnInit {
  public promotions: IPromoResponse[] = [];
  public formStatus = false;
  public editStatus = false;
  public uploadedStatus = false;
  public uploadPercent = 0;
  public promoForm!: FormGroup;

  private currentEditId = 0;

  constructor(
    private promoService: PromoService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initPromoForm();
    this.getPromotions();
  }

  initPromoForm(): void {
    this.promoForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null]
    })
  }

  getPromotions(): void {
    this.promoService.getAll().subscribe(data => this.promotions = data);
  }

  addPromo(): void {
    this.formStatus ? this.resetFormAll() : this.formStatus = true;
  }

  editPromo(promo: IPromoResponse): void {
    this.promoForm.patchValue({
      name: promo.name,
      title: promo.title,
      description: promo.description,
      imagePath: promo.imagePath
    })
    this.formStatus = true;
    this.editStatus = true;
    this.uploadedStatus = true;
    this.currentEditId = promo.id;
  }

  savePromo(): void {
    if (this.editStatus) {
      this.promoService.update(this.promoForm.value, this.currentEditId).subscribe(() => {
        this.resetFormAll();
        this.getPromotions();
      })
    }
    else {
      this.promoService.create(this.promoForm.value).subscribe(() => {
        this.resetFormAll();
        this.getPromotions();
      })
    }
  }

  deletePromo(promo: IPromoResponse): void {
    if (confirm('Are you sure?')) {
      this.promoService.delete(promo.id).subscribe(() => this.getPromotions())
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/promotions', file.name, file)
      .then(data => {
        this.promoForm.patchValue({
          imagePath: data
        });
        this.uploadedStatus = true;
      })
      .catch(err => console.error(err));
  }

  deleteImg(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      this.uploadedStatus = false;
      this.uploadPercent = 0;
      this.promoForm.patchValue({ promoPath: null });
    })
  }

  valueByControl(control: string): string {
    return this.promoForm.get(control)?.value;
  }

  private async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = Math.round(data.progress);
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log('Wrong file');
    }
    return Promise.resolve(url);
  }

  private resetFormAll(): void {
    this.formStatus = false;
    this.editStatus = false;
    this.promoForm.reset();
    this.uploadedStatus = false;
    this.uploadPercent = 0;
  }
}
