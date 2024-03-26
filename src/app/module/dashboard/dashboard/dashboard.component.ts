import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router){}

  ngOnInit(): void {
    console.log(localStorage.getItem('authToken'))
  }
  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
