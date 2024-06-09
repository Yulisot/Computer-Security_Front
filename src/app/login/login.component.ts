import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  attemptCounter: number = 0;
  maxLoginAttempts: number = 3;
  isSecuredApi: boolean = true;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  toggleapiVersion(){
    this.isSecuredApi =!this.isSecuredApi;
    const policyMessage=(`API version switched to ${this.isSecuredApi ? 'secured' : 'unsecured'}`);

    this.snackBar.open(policyMessage, 'Close', {
      duration: 5000,
      horizontalPosition:"center",
      verticalPosition: "bottom",
    });

    console.log(`API version switched to ${this.isSecuredApi ? 'secured' : 'unsecured'}`);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.attemptCounter < this.maxLoginAttempts) {
        const loginData = this.loginForm.value;

        const apiVersion = this.isSecuredApi ? 'secured' : 'unsecured';
        const apiUrl = `http://127.0.0.1:8000/users/${apiVersion}/login`;

        this.http.post(apiUrl, loginData).subscribe(
          (response: any) => {
            if (response.message === 'Authorized') {
              this.successMessage = 'Login successful';
              this.errorMessage = '';
              this.authService.login();

              console.log('Navigating to system-screen');
              this.router.navigate(['/system-screen']);
              console.log('Navigation completed');
            } else {
              this.errorMessage = 'Incorrect Username or Password';
            }
          },
          (error) => {
            if (error.error && error.error.error === 'Not Authorized') {
              this.errorMessage = 'Incorrect Username or Password';
            } else {
              this.errorMessage = 'An error occurred during login';
            }
            this.successMessage = '';
          }
        );

        this.attemptCounter++;
      } else {
        this.errorMessage = 'Maximum login attempts reached. Please contact support.';
      }
    }
  }
}
