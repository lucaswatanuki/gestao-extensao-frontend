import { Relatorio } from './../../models/relatorio.model';
import { HttpClient, HttpParams, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private baseUrl = environment.api + 'report';

  constructor(private http: HttpClient) { }

  extrairRelatorioPorDocente(request: Relatorio): Observable<any> {
    
    return this.http.post<Relatorio[]>(this.baseUrl + '/docente', request);
  }

  extrairRelatorioGeral(request: Relatorio): Observable<any> {
    
    return this.http.post<Relatorio[]>(this.baseUrl + '/todos', request);
  }

  gerarPdf(request: Relatorio): Observable<Blob>  {
    return this.http.post(this.baseUrl + '/export', request, {responseType: 'blob'});
  }
}
