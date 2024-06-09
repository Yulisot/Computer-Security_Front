
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInKey = 'loggedIn'; // Key for session storage
  private apiUrl = 'http://127.0.0.1:8000/users/secured';

  constructor(private http: HttpClient) {}


  login(): void {
    sessionStorage.setItem(this.isLoggedInKey, 'true');
  }

  logout(): void {
    sessionStorage.removeItem(this.isLoggedInKey);
  }

  isUserLoggedIn(): boolean {
    return sessionStorage.getItem(this.isLoggedInKey) === 'true';
  }


  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send_reset_password_email`, { email });
  }


  resetPassword(username: string, key: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset_password`, { "username":username, "key": key, "new_password": newPassword });
  }
}


