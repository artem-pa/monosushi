import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { DeliveryPayComponent } from './pages/delivery-pay/delivery-pay.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductCategoriesComponent } from './pages/product-categories/product-categories.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { AdminComponent } from './pages/admin/admin.component';
import { AdminPromotionsComponent } from './pages/admin/admin-promotions/admin-promotions.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'promotions', component: PromotionsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'delivery-payment', component: DeliveryPayComponent},
  {path: 'product-categories/:category', component: ProductCategoriesComponent},
  {path: 'oferta', component: OfertaComponent},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'promotions', component: AdminPromotionsComponent},
    {path: 'categories', component: AdminCategoriesComponent},
    {path: 'products', component: AdminProductsComponent},
    {path: 'orders', component: AdminOrdersComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
