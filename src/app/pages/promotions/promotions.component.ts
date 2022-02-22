import { Component, OnInit } from '@angular/core';
import { IPromoResponse } from 'src/app/shared/interfaces/promo.interface';
import { PromoService } from 'src/app/shared/services/promo/promo.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss',]
})
export class PromotionsComponent implements OnInit {

  constructor(
    private promoService: PromoService
  ) { }

  public promotions: IPromoResponse[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.promoService.getAll().subscribe(data => this.promotions = data);
  }

}
