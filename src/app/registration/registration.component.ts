import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
registrationForm!: FormGroup;
successMessage: string = '';
errorMessage: string = '';
passwordChangeForm: any;
isSecuredApi: boolean = true;

  constructor(private fb: FormBuilder, private http: HttpClient,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  toggleApiVersion(): void {
    this.isSecuredApi = !this.isSecuredApi;
    const policyMessage = (`API version switched to ${this.isSecuredApi ? 'secured' : 'unsecured'}`);
    this.snackBar.open(policyMessage,'close', {
      duration: 5000,
      horizontalPosition:"center",
      verticalPosition: "bottom",
    });

    console.log(`API version switched to ${this.isSecuredApi ? 'secured' : 'unsecured'}`);

  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const registrationData = this.registrationForm.value;

      const apiVersion = this.isSecuredApi ? 'secured' : 'unsecured';
      const apiUrl = `http://127.0.0.1:8000/users/${apiVersion}/register`;

      this.http.post(apiUrl, registrationData).subscribe(
        (response: any) => {
          console.log('Response:', response);
          if (response.message === 'Registerd Seccesfully') {
            this.successMessage = 'Registration successful';
            this.errorMessage = '';
            console.log('Registration successful:', response.message);
          } else {
            this.errorMessage = 'Unknown error occurred during registration';
            this.successMessage = '';
            console.error('Registration failed:', response);
          }
        },
        (error) => {
          if (error.error) {
            if (error.error.error === 'Weak password') {
              this.errorMessage = 'Weak password';
            } else if (error.error.error === 'This username is taken') {
              this.errorMessage = 'This username is taken';
            } else if (error.error.error === 'This Email address is taken') {
              this.errorMessage = 'This Email address is taken';
            } else {
              this.errorMessage = 'An unexpected error occurred during registration';
            }
          } else {
            this.errorMessage = 'An unexpected error occurred during registration';
          }
          this.successMessage = '';
        }
      );
    }
  }
}
