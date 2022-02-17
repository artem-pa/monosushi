import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { DeliveryPayComponent } from './pages/delivery-pay/delivery-pay.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductCategoriesComponent } from './pages/product-categories/product-categories.component';
import { AdminComponent } from './pages/admin/admin.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'promotions', component: PromotionsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'delivery-payment', component: DeliveryPayComponent},
  {path: 'product-categories/:category', component: ProductCategoriesComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'oferta', component: OfertaComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
