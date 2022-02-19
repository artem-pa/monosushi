import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MainComponent } from './pages/main/main.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { DeliveryPayComponent } from './pages/delivery-pay/delivery-pay.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductCategoriesComponent } from './pages/product-categories/product-categories.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { AdminPromotionsComponent } from './pages/admin/admin-promotions/admin-promotions.component';
import { AdminCategoriesComponent } from './pages/admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './pages/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PromotionsComponent,
    DeliveryPayComponent,
    AboutUsComponent,
    ProductCategoriesComponent,
    OfertaComponent,
    AdminComponent,
    AdminPromotionsComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
