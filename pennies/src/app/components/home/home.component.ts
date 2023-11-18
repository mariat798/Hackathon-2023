/// home.component.ts

// API imports
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: ''
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (this.userService.IsLoggedIn) {
      this.router.navigate(['/view']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
