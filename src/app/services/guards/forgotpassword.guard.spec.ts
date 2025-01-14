// forgot-password.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.IsForgotPasswordSubmitted()) {
      return true;
    } else {
      this.router.navigate(['/forgotpassword']); // Redirect to forgot password page if form not submitted
      return false;
    }
  }
}
