import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-acknowledgment',
  templateUrl: './acknowledgment.component.html',
  styleUrl: './acknowledgment.component.scss'
})
export class AcknowledgmentComponent {
  password?: string;
  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const userPassword = localStorage.getItem('userPassword');
    this.password = userPassword !== null ? userPassword : undefined;
  }
  login(): void{
    this.router.navigate(['/login'])
  }
}
