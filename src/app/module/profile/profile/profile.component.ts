import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userProfile: any;
  editMode: boolean = false;
  editedInterests: string[] = [];
  newInterest: string = '';


  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    // Fetch user profile data from the server when component initializes
    this.userService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data.user; // Set user profile data
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  editProfile(): void {
    this.editMode = true;
    console.log(this.editMode)
    this.editedInterests = [...this.userProfile.interests]; // Copy interests to editedInterests
  }

  addInterest(): void {
    if (this.newInterest.trim() !== '') {
      this.editedInterests.push(this.newInterest.trim());
      this.newInterest = ''; // Clear the input field after adding interest
    }
  }

  saveProfile(): void {
    // Send updated profile data to the server
    const updatedProfile = { ...this.userProfile, interests: this.editedInterests };
    this.userService.updateUserProfile(updatedProfile).subscribe(
      (data) => {
        // Update userProfile with the response data
        this.userProfile = data.user;
        this.editMode = false; // Exit edit mode
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }
}