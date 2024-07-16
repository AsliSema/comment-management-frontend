import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest } from '../models/login-request.dto';
import { LoginResponse } from '../models/login-response.dto';
import { Observable, catchError, of } from 'rxjs';
import { GetUserByEmailResponse } from '../../comments/models/get-user-by-email-dto';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private readonly controllerUrl = `${environment.apiUrl}/auth`

  loginUser(request: LoginRequest): Observable<LoginResponse>{
    const url = `${this.controllerUrl}/login`; 
    return this.httpClient.post<LoginResponse>(url, request);
  }

  getUserByEmail(email: string): Observable<GetUserByEmailResponse>{
    const url = `${environment.apiUrl}/auth/getUserByEmail`; 
    return this.httpClient.post<GetUserByEmailResponse>(url, email);
  }

  getUser(): Observable<GetUserByEmailResponse | null> {
    const decodedEmail = this.decodeToken();
    if (decodedEmail) {
      return this.getUserByEmail(decodedEmail).pipe(
        catchError(error => {
          console.error('Error fetching user:', error);
          // Handle error and return null
          return of(null);
        })
      );
    } else {
      console.log('No valid token found');
      return of(null); 
    }
  }

  decodeToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: { sub: string } = jwtDecode(token);
        return decodedToken.sub;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  } 

}
