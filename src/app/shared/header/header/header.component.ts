import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  showNavbar: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Subscribe to router events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the login page or the forgot password page
        const excludedRoutes = ['/login', '/forgotpassword'];
        this.showNavbar = !excludedRoutes.includes(event.url);
      }
    });
  }
}
