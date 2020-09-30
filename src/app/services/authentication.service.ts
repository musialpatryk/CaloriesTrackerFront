import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private accessToken: string = "TESTTOKEN";

  constructor() { }

  gatherJWT(userName: string, password: string): boolean{
    // gather jwt from API and assign it in storage.
    // if jwt is gathered return true else return false to inform user.
    if(userName === 'a' && password === 'a') return true;
    return false;
  }
}
