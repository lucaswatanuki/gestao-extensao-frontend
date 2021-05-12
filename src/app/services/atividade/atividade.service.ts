import { HttpClient } from '@angular/common/http';
import { Atividade } from './../../models/atividade.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Regencia } from 'src/app/models/regencia.model';
import { Convenio } from 'src/app/models/convenio.model';
import { CursoExtensao } from 'src/app/models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  private baseUrl = environment.api + 'atividade';

  constructor(private http: HttpClient) { }

  listarAtividades(): Observable<any> {
    return this.http.get<Atividade[]>(this.baseUrl + '/listar');
  }

  excluirAtividade(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/' + id);
  }

  consultarAtividade(id: number): Observable<Atividade> {
    return this.http.get<Atividade>(this.baseUrl + '/' + id);
  }

  salvarAtividade(atividade: Atividade): Observable<Blob>  {
    return this.http.get(this.baseUrl + '/download/' + atividade.tipoAtividade + '/' + atividade.id, {responseType: 'blob'});
  }

  salvarRegencia(request: Regencia): Observable<any> {
    return this.http.post<Regencia>(`${this.baseUrl}/regencia`, request);
  }

  consultarConvenio(id: number): Observable<Convenio> {
    return this.http.get<Convenio>(this.baseUrl + '/convenio/' + id);
  }

  consultarCurso(id: number): Observable<CursoExtensao> {
    return this.http.get<CursoExtensao>(this.baseUrl + '/curso-extensao/' + id);
  }

  consultarRegencia(id: number): Observable<Regencia> {
    return this.http.get<Regencia>(this.baseUrl + '/regencia/' + id);
  }

  updateConvenio(atividade: Convenio): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/convenio', atividade);
  }

  updateCurso(atividade: CursoExtensao): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/curso-extensao', atividade);
  }

  updateRegencia(atividade: Regencia): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/regencia', atividade);
  }
}
