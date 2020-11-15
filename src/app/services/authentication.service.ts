import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessToken: string;

  constructor(private router: Router, private http: HttpClient) { }

  /**
   * Pass username and password to API endpoint and return observable of this action.
   * @param Username
   * @param Password 
   */
  login(userName: string, password: string): Observable<object>{
    return this.http.post('/api/users/login', { name: userName, password: password });
  }

  /**
   * Logout user by deleting local storage token and redirect to login page.
   */
  logout(): void{
    localStorage.removeItem('token');
    this.router.navigateByUrl('panel-logowania?message=3');
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

  getAuthHeaders(): HttpHeaders{
    return new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + this.getCurrentToken()
    });
  }
}
