import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  username: string = '';
  email: string = '';
  mobileNumber: string = '';
  error: string = '';
  password: string = ''

  constructor(private router: Router, private authService: AuthService) {}

  submit(): void {
    // Validate inputs (you can add more validation logic)
    if (!this.username || !this.email || !this.mobileNumber) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.authService.forgotPassword(this.username, this.email, this.mobileNumber)
      .subscribe(
        response => {
          if (response && response.message === 'Password sent successfully') {
            this.password = response.password; // Assuming password is included in the response
            this.router.navigate(['/forgotpassword/acknowledgment']);
          } else {
            this.error = 'Failed to reset password';
          }
        });
  }
}
