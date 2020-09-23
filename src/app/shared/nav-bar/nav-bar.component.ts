import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

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

  constructor( location: Location, router: Router ) { 
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
}
