import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Senha } from 'src/app/models/senha.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {

  private baseUrl = environment.api + 'senha';

  constructor(private http: HttpClient) { }

  resetarSenha(request: Senha): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/reset', request);
  }

  verificarTokenSenha(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verificarToken/${token}`)
  }

  alterarSenha(request: Senha): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/alterarSenha', request);
  }
}
