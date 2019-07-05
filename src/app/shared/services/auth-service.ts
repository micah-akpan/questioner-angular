import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: 'http://localhost:9999';

  constructor(private http: HttpClient) { }

  login(userCredentials): Observable<any> {
    return this.http.post('http://localhost:9999/api/v1/auth/login', userCredentials);
  }
}
