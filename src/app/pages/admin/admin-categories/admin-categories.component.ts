import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, Storage } from '@angular/fire/storage';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ref, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['../admin.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  public categories: ICategoryResponse[] = [];
  public formStatus = false;
  public editStatus = false;
  public uploadedStatus = false;
  public uploadPercent = 0;
  public categoryForm!: FormGroup;

  private currentEditId = 0;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initPromoForm();
    this.getCategories();
  }

  initPromoForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['/assets/pages/promotions/roll-of-week.png']
    })
  }

  getCategories(): void {
    this.categoryService.getAll().subscribe(data => this.categories = data);
  }

  addCategory(): void {
    this.formStatus ? this.resetFormAll() : this.formStatus = true;
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    })
    this.formStatus = true;
    this.editStatus = true;
    this.uploadedStatus = true;
    this.currentEditId = category.id;
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.categoryService.update(this.categoryForm.value, this.currentEditId).subscribe(() => {
        this.resetFormAll();
        this.getCategories();
      })
    }
    else {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        this.resetFormAll();
        this.getCategories();
      })
    }
  }

  deleteCategory(category: ICategoryResponse): void {
    if (confirm('Are you sure?')) {
      this.categoryService.delete(category.id).subscribe(() => this.getCategories())
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images/categories', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
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
      this.categoryForm.patchValue({ promoPath: null });
    })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
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
    this.categoryForm.reset();
    this.uploadedStatus = false;
    this.uploadPercent = 0;
  }
}
