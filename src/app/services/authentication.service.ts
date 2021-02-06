import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private router: Router, private http: HttpClient) {}

  login(userName: string, password: string): Observable<Record<string, any>> {
    return this.http.post('/api/users/login', { name: userName, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('panel-logowania?message=3');
  }

  isUserLogged(): boolean {
    if (localStorage.getItem('token')) return true;
    return false;
  }

  getCurrentToken(): string | null {
    if (localStorage.getItem('token')) return localStorage.getItem('token');
    return null;
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'content-type': 'application/json',
      authorization: 'Bearer ' + this.getCurrentToken(),
    });
  }
}
