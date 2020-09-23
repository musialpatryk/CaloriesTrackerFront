import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';

const routes: Routes = [
  {
    path: 'panel-logowania',
    component: LoginPageComponent
  },
  {
    path: 'dodaj-produkt',
    component: AddProductPageComponent
  },
  {
    path: '',
    component: ProductListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
