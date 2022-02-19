import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPromoRequest, IPromoResponse } from '../../interfaces/promo.interface';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  private url = environment.BACKEND_URL;
  private api = { promotions: `${this.url}/promotions` };

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<IPromoResponse[]> {
    return this.http.get<IPromoResponse[]>(this.api.promotions)
  }

  create(promo: IPromoRequest): Observable<IPromoResponse> {
    return this.http.post<IPromoResponse>(this.api.promotions, promo);
  }

  update(promo: IPromoRequest, id: number): Observable<IPromoResponse> {
    return this.http.patch<IPromoResponse>(`${this.api.promotions}/${id}`, promo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.promotions}/${id}`);
  }
}
