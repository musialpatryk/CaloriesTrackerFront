import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessToken: string;

  constructor(private router: Router) { }

  /**
   * Gather jwt from API and assign it in storage. If user data is invalid return false.
   * !! Actually works with mock data! !!
   * @param Username
   * @param Password 
   */
  login(userName: string, password: string): boolean{
    if(userName !== 'a' && password !== 'a') return false;
    localStorage.setItem('token', 'TESTTOKEN');
    return true;
  }

  /**
   * Logout user by deleting local storage token and redirect to login page.
   */
  logout(): void{
    localStorage.removeItem('token');
    this.router.navigateByUrl('panel-logowania?message=1');
    
  }

  /**
   * Check if token exists in local storage.
   */
  isUserLogged(): boolean{
    if(localStorage.getItem('token')) return true;
    return false;
  }

  /**
   * Get token from local storage and return it. 
   * If no token available, null returned.
   */
  getCurrentToken(): string | null{
    if(localStorage.getItem('token')) return localStorage.getItem('token');
    return null;
  }
}
