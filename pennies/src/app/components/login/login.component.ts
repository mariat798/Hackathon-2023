/// app.component.ts

// API imports
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

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

  constructor(private apiService: ApiService) {}

  public get Username(): string {
    return this.form.get('username')?.value;
  }

  public get Password(): string {
    return this.form.get('password')?.value;
  }
  
  public valid(): boolean {
    return this.Username.length > 0 && this.Password.length > 0;
  }

  public submit(): void {
    this.apiService.login(this.Username, this.Password);
  }
}
