import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product.category';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  public products: IProductResponse[] = [];

  ngOnInit(): void {
    this.activatedRouter.parent?.params.subscribe(data => {
      this.loadProductsByCategory(data['category']);
    });
    
  }

  loadProductsAll(): void {
    this.productService.getAll().subscribe(data => this.products = data);
  }

  loadProductsByCategory(name = 'sushi'): void {
    this.productService.getAllByCategory(name).subscribe(data => this.products = data);
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
