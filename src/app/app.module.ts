import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { MainContentComponent } from './shared/main-content/main-content.component';
import { MealComponent } from './pages/product-list-page/meal/meal.component';
import { MessageBoxComponent } from './shared/message-box/message-box.component';
import { AddProductComponent } from './pages/product-page/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProductListPageComponent,
    ProductPageComponent,
    NavBarComponent,
    MainContentComponent,
    MealComponent,
    MessageBoxComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
