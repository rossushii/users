import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isForgotPasswordSubmitted: boolean = false;
    constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>('http://localhost:3000/login', { username, password }).pipe(
      catchError(error => {
        console.error('Error logging in:', error);
        return of(false); // Return false in case of error
      }),
      map(response => {
        if (response && response.success && response.token) {
          localStorage.setItem('authToken', response.token); // Save token in local storage
          return true; // Login successful
        } else {
          return false; // Login failed
        }
      })
    );
  }

  forgotPassword(username: string, email: string, mobileNumber: string): Observable<any> {
    // Assuming you have an endpoint for forgot password authentication
    return this.http.post<any>('http://localhost:3000/forgotpassword', { username, email, mobileNumber }).pipe(
      catchError(error => {
        console.error('Error submitting forgot password request:', error);
        return of(false); // Return false in case of error
      }),
      map(response => {
        this.isForgotPasswordSubmitted = true; // Set flag to true upon successful submission
        localStorage.setItem('userPassword', response.password);
        return response; // Return response from server
      })
    );
  }

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    console.log('User logged out.');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
  IsForgotPasswordSubmitted(): boolean {
    return this.isForgotPasswordSubmitted;
  }
  getUserProfile(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/profile');
  }
}
