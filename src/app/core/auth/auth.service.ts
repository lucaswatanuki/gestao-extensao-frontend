import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthLoginInfo } from './login-info';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { SignUpInfo } from './signup-info';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = environment.api + 'auth/login';
  private signupUrl = environment.api + 'auth/registrar';

  constructor(private http: HttpClient) { }

  login(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<any> {
    return this.http.post(this.signupUrl, info, { responseType: 'text' });
  }
}
