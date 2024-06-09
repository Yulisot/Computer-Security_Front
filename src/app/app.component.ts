// app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  navigateToRegistration(): void {
    this.router.navigate(['/registration']);
  }

  navigateToPasswordChange(): void {
    this.router.navigate(['/password-change']);
  }

    navigateToforgetpassword(): void {
    this.router.navigate(['/forget-password']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
