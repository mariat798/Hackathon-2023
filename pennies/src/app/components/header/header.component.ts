/// header.component.ts

// API imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(
    private userService: UserService
  ) {}

  public get UserStatusMessage(): string {
    if (this.userService.IsLoggedIn) {
      return `Logged in as ${this.userService.user?.userName}`;
    }

    return 'Not logged in';
  }
}
