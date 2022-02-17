import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    PromotionsComponent,
    DeliveryPayComponent,
    AboutUsComponent,
    AdminComponent,
    ProductCategoriesComponent,
    OfertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
