import { Component, OnInit } from '@angular/core';
import { IProductResponse } from 'src/app/shared/interfaces/product.category';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  public products: IProductResponse[] = [];

  ngOnInit(): void {
    this.loadProductsAll();
  }

  loadProductsAll(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  increaseCount(product: IProductResponse): void {
    if (product.count >= 9) return;
    product.count++;
  }

  reduceCount(product: IProductResponse): void {
    if (product.count <= 1) return;
    product.count--;
  }
}
