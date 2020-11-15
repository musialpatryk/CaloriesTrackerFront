import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { LoggedInUsersGuard } from './guards/logged-in-users.guard';
import { LoginPageGuard } from './guards/login-page.guard';

const routes: Routes = [
  {
    path: 'panel-logowania',
    component: LoginPageComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'produkty',
    component: ProductPageComponent,
    canActivate: [LoggedInUsersGuard]
  },
  {
    path: '',
    component: ProductListPageComponent,
    canActivate: [LoggedInUsersGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoggedInUsersGuard]
})
export class AppRoutingModule { }
