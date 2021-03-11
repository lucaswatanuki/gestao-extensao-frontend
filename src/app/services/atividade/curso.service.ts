import { CursoExtensao } from './../../models/curso.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseUrl = environment.api + 'atividade';

  constructor(private http: HttpClient) { }

  salvarCurso(curso: CursoExtensao): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/curso', curso);
  }
}
