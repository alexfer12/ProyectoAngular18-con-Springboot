import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navigateToImageManagement() {
    this.router.navigateByUrl('/images');
  }

  navigateToPdfManagement(){
    this.router.navigateByUrl('/pdfs');
  }
  navigateToUsersManagement(){
    this.router.navigateByUrl('/users');
  }

}
