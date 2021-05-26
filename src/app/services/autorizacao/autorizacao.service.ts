import { Autorizacao } from './../../models/autorizacao.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Atividade } from 'src/app/models/atividade.model';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutorizacaoService {

  private baseUrl = environment.api + 'atividade';

  constructor(private http: HttpClient) { }

  listarAutorizacoes(): Observable<any> {
    return this.http.get<Autorizacao[]>(this.baseUrl + '/autorizacao');
  }

  autorizar(atividade: Atividade): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/autorizar/' + atividade.id, atividade);
  }

}
