import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProductResponse } from 'src/app/shared/interfaces/product.category';
import { ICategoryResponse } from 'src/app/shared/interfaces/category.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['../admin.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public categories: ICategoryResponse[] = [];
  public products: IProductResponse[] = [];
  public formStatus = false;
  public editStatus = false;
  public uploadedStatus = false;
  public uploadPercent = {percent: 0};
  public uploadPercent1 = 0;
  public productForm!: FormGroup;
  public defaultSelect = null;

  private currentEditId = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initPromoForm();
    this.loadProducts();
    this.loadCategories();
  }

  initPromoForm(): void {
    this.productForm = this.fb.group({
      category: [this.defaultSelect, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      ingredients: [null],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  addProduct(): void {
    this.formStatus ? this.resetFormAll() : this.formStatus = true;
  }

  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      ingredients: product.ingredients,
      weight: product.weight,
      price: product.price,
      imagePath: product.imagePath,
    });
    this.formStatus = true;
    this.editStatus = true;
    this.uploadedStatus = true;
    this.currentEditId = product.id;
  }

  saveCategory(): void {
    if (this.editStatus) {
      this.productService.update(this.productForm.value, this.currentEditId).subscribe(() => {
        this.resetFormAll();
        this.loadProducts();
      })
    }
    else {
      this.productService.create(this.productForm.value).subscribe(() => {
        this.resetFormAll();
        this.loadProducts();
      })
    }
  }

  deleteProduct(product: IProductResponse) {
    if (confirm('Are you sure?')) {
      this.productService.delete(product.id).subscribe(() => this.loadProducts())
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images/products', file.name, file, this.uploadPercent)
      .then(data => {
        this.productForm.patchValue({
          imagePath: data
        });
        this.uploadedStatus = true;
      })
      .catch(err => console.error(err));
  }

  deleteImg(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.uploadedStatus = false;
        this.uploadPercent.percent = 0;
        this.productForm.patchValue({ imagePath: null });
      })
      .catch(err => console.log(err));
  }

  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }


  private resetFormAll(): void {
    this.formStatus = false;
    this.editStatus = false;
    this.productForm.reset();

    this.uploadedStatus = false;
    this.uploadPercent.percent = 0;
  }
}
