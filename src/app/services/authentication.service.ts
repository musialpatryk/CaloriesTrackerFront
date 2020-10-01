import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessToken: string;

  constructor(private router: Router) { }

  login(userName: string, password: string): boolean{
    // gather jwt from API and assign it in storage. If user data is invalid return false.
    if(userName !== 'a' && password !== 'a') return false;
    localStorage.setItem('token', 'TESTTOKEN');
    return true;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('panel-logowania');
  }

  isUserLogged(): boolean{
    if(localStorage.getItem('token')) return true;
    return false;
  }

  getCurrentJWT(){
    if(localStorage.getItem('token')) return localStorage.getItem('token');
    return null;
  }
}
