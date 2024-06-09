import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  isSuccessfulResponse: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetPasswordForm = this.fb.group({
      username: ['', [Validators.required]], // Add this line for username
      Key: ['', [Validators.required]], // Adjust the name to match your form
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmitForgetPassword() {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value.email;
      this.authService.forgetPassword(email).subscribe(
        (response) => {
          console.log('Reset password email sent successfully:', response);
          this.isSuccessfulResponse = true;
        },
        (error) => {
          console.error('Error sending reset password email:', error);
        }
      );
    }
  }

  onSubmitResetPassword() {
    if (this.resetPasswordForm.valid) {
      const username = this.resetPasswordForm.value.username;
      const key = this.resetPasswordForm.controls['Key'].value;
      const password = this.resetPasswordForm.value.password;
      console.log('Username:', username);
      console.log('Key:', key);
      console.log('Password:', password);
      console.log('Request Payload:', { username, key, password });

      this.authService.resetPassword(username, key, password).subscribe(
        (response) => {
          console.log('Password reset successfully:', response);
        },
        (error) => {
          console.error('Error resetting password:', error);
        }
      );
    }
  }
}
