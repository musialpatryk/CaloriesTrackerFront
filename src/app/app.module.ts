import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { MainContentComponent } from './shared/main-content/main-content.component';
import { MealComponent } from './pages/product-list-page/meal/meal.component';
import { MessageBoxComponent } from './shared/message-box/message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ProductListPageComponent,
    AddProductPageComponent,
    NavBarComponent,
    MainContentComponent,
    MealComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
