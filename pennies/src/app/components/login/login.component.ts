/// app.component.ts

// API imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router, private apiService: ApiService) {}

  public get Username(): string {
    return this.form.get('username')?.value;
  }

  public get Password(): string {
    return this.form.get('password')?.value;
  }
  
  public valid(): boolean {
    return this.Username.length > 0 && this.Password.length > 0;
  }

  public async submit(): Promise<void> {
    if (await this.apiService.tryLogin(this.Username, this.Password)) {
      this.router.navigate(['/']);
    }
  }
}
