import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-system-screen',
  templateUrl: './system-screen.component.html',
  styleUrls: ['./system-screen.component.css']
})
export class SystemScreenComponent {
  customerForm!: FormGroup;
  newCustomerName: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  customerDetails: any;
  isSecuredApi:boolean =true;


  constructor(private fb: FormBuilder,private router:Router, private http:HttpClient,private authService: AuthService, private snackBar: MatSnackBar) {
    this.createCustomerForm();
  }

  createCustomerForm(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
    });

  }
  toggleapiversion(){
    this.isSecuredApi = !this.isSecuredApi;
    const policyMessage=(`API version switched to ${this.isSecuredApi ? 'secured' : 'unsecured'}`);

    this.snackBar.open(policyMessage, 'Close', {
      duration: 5000,
      horizontalPosition:"center",
      verticalPosition: "bottom",
    });

    console.log(`API version switched to ${this.isSecuredApi ? 'secured' : 'unsecured'}`);
  }
  navigateToPasswordChange(): void {
    this.router.navigate(['/password-change']);
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const newCustomerData = this.customerForm.value;

      const apiVersion = this.isSecuredApi ? 'secured' : 'unsecured';
      this.http.post(`http://127.0.0.1:8000/costumers/${apiVersion}/add_costumer`, newCustomerData).subscribe(
        (response: any) => {
          console.log("API response:", response);

          if (response.message === 'Costumer addedd successfully') {
            this.errorMessage = '';

            this.http.get(`http://127.0.0.1:8000/costumers/${apiVersion}/get_costumer?email=${newCustomerData.email}`).subscribe(
              (customerDetails: any) => {
                console.log('Updated Customer Details:', customerDetails);

                if (typeof customerDetails === 'string') {
                  customerDetails = JSON.parse(customerDetails);
                }

                const message = customerDetails.message;
                const parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;

                this.newCustomerName = parsedMessage.name;
                this.customerDetails = parsedMessage;

                this.customerForm.reset();
              },
              (error) => {
                console.error('Failed to retrieve updated customer details:', error);
              }
            );
          } else {
            this.errorMessage = `${response.error} ${this.newCustomerName}`;

            this.successMessage = '';
            this.newCustomerName='';
            console.error('Customer addition failed:', response);
          }
        },
        (error) => {
          this.errorMessage = 'An error occurred during customer addition';
          this.successMessage = '';
          console.error('HTTP error during customer addition:', error);
        }
      );
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }



}
