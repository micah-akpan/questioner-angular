import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:9999/api/v1';
  isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, userCredentials);
  }

  signUpUser(userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, userCredentials);
  }
}
