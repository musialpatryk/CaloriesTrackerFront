import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if(state.url == '/panel-logowania' && this.authService.isUserLogged()) return this.router.parseUrl('');  
    return true;
  }
  
}
