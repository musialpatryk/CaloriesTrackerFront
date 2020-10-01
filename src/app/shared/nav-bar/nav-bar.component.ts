import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentPath: string;
  noNavPaths= [
    '/panel-logowania'
  ];

  constructor( location: Location, router: Router, private authService: AuthenticationService ) { 
    router.events.subscribe(val => {
      this.currentPath = location.path();
    });
  }

  ngOnInit(): void { }

  isNavVisible(): Boolean{
    if(this.noNavPaths.some(
      (element) => element === this.currentPath
    )) return false;
    return true;
  }

  handleLogout(){
    this.authService.logout();
  }
}
