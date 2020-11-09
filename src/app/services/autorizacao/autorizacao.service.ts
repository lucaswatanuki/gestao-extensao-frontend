import { Autorizacao } from './../../models/autorizacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  private baseUrl = environment.api + 'atividade';

  constructor(private http: HttpClient) { }

  listarAutorizacoes(): Observable<any> {
    return this.http.get<Autorizacao[]>(this.baseUrl + '/autorizacao');
  }

}
