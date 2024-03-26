import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // Assuming your API endpoint for user data
user:any;
  constructor(private http: HttpClient) {}

  // Method to fetch user profile data from the API
  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  // Method to update user profile data
  updateUserProfile(userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateprofile`, userData);
  }

  // Other methods for managing user data can be added here, such as fetching user interests, etc.
}