import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  noNavPaths: Array<string> = ['/panel-logowania'];
  currentUrl: string;
  isMobileNavbarExpanded = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (this.currentUrl !== e.url && this.isMobileNavbarExpanded)
          this.isMobileNavbarExpanded = !this.isMobileNavbarExpanded;
        this.currentUrl = e.url.split('?')[0];
      }
    });
  }

  /**
   * Checks if nav should be visible on current path depending.
   */
  isNavVisible(): boolean {
    if (this.noNavPaths.some((element) => element === this.currentUrl))
      return false;
    return true;
  }

  handleLogoutButton() {
    this.authService.logout();
  }

  handleExpandButton() {
    this.isMobileNavbarExpanded = !this.isMobileNavbarExpanded;
  }
}
