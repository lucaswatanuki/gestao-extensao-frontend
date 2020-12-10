import { CursoExtensao } from './../../models/curso.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convenio } from 'src/app/models/convenio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  private baseUrl = environment.api + 'atividade';

  constructor(private http: HttpClient) { }

  salvarConvenio(convenio: Convenio): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/convenio', convenio);
  }

  salvarCurso(curso: CursoExtensao): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/curso', curso);
  }


}
