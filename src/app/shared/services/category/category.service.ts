import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category.interface'; '../../interfaces/category.interface'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/categories` };

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.api.categories)
  }

  create(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.api.categories, category);
  }

  update(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.api.categories}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}
