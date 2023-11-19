/// app.routes.ts

// API imports
import { Routes } from '@angular/router';

// Component imports
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'view', component: ViewComponent }
];
