import { ICategoryResponse } from "./category.interface";

export interface IProductRequest {
  category: ICategoryResponse;
  name: string;
  path: string;
  ingredients?: string;
  weight: string | number;
  price: number;
  imagePath: string;
}

export interface IProductResponse extends IProductRequest {
  id: number;
  count: number;
}