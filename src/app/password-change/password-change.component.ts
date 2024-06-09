import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  passwordChangeForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isSecuredApi:boolean = true;


  constructor(private fb: FormBuilder, private http: HttpClient,private snackBar: MatSnackBar, private router:Router ) { }

  ngOnInit(): void {
    this.createPasswordChangeForm();
  }

  createPasswordChangeForm(): void {
    this.passwordChangeForm = this.fb.group({
      username: ['', Validators.required],
      old_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  Goback():void {
    this.router.navigate(['/system-screen']);
  }

  toogleapiversion(){
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
    if (this.passwordChangeForm.valid) {
      const passwordChangeData = this.passwordChangeForm.value;

      const apiVersion = this.isSecuredApi ? 'secured' : 'unsecured';
      const apiUrl = `http://127.0.0.1:8000/users/${apiVersion}/change_password`;

      this.http.put(apiUrl, passwordChangeData).subscribe(
        (response: any) => {
          if (response.message === 'Password Seccessfully Changed') {
            this.successMessage = 'Password change successful';
            this.errorMessage = '';
          } else {
            this.errorMessage = 'Password change failed';
            this.successMessage = '';
          }

        },
        (error) => {
          console.log('Full error object:', error);

          if (error.error && error.error.error) {
            this.errorMessage = error.error.error;
          } else {
            this.errorMessage = 'An unexpected error occurred during password change';
          }
          this.successMessage = '';
          console.error('HTTP error during password change:', error);
        }
      );
    }
  }

  showPasswordPolicy(): void {
    const policyMessage =
      'Password Policy: \n' +
      '- Minimum 10 characters \n' +
      '- At least one digit \n' +
      '- At least one special character (e.g., \'!\')';

    this.snackBar.open(policyMessage, 'Close', {
      duration: 5000,
      horizontalPosition:"center",
      verticalPosition: "bottom",
    });
  }

  showapichange(){
    const policyMessage=(`API version switched to ${this.isSecuredApi ? 'secured' : 'unsecured'}`);
  }
}
