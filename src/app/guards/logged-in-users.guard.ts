import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Checks if user is logged
 * If user is not logged in return false and redirect to login panel.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggedInUsersGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      if(!this.authService.isUserLogged()){
        return this.router.parseUrl('panel-logowania');
      } else {
        return true;
      }
  }
  
}
