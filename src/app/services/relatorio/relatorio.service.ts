import { Relatorio } from './../../models/relatorio.model';
import { HttpClient, HttpParams, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private baseUrl = environment.api + 'report';

  constructor(private http: HttpClient) { }

  extrairRelatorioPorDocente(id: number, status: string, dataInicio: Date, dataFim: Date): Observable<any> {
    
    let header = new HttpHeaders().append('status', status);
    let parametro = new HttpParams();
    parametro.set('dataInicio', dataInicio.toLocaleDateString());
    parametro.set('dataFim', dataFim.toLocaleDateString());
    
    return this.http.get<Relatorio[]>(this.baseUrl + '/' + id, { headers: header, params: parametro });
  }
}
