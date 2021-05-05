import { HttpClient } from '@angular/common/http';
import { Atividade } from './../../models/atividade.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Regencia } from 'src/app/models/regencia.model';
import { Convenio } from 'src/app/models/convenio.model';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  private baseUrl = environment.api + 'atividade';

  constructor(private http: HttpClient) { }

  listarAtividades(): Observable<any> {
    return this.http.get<Atividade[]>(this.baseUrl + '/listar');
  }

  excluirAtividade(id: number): void {
    this.http.delete(this.baseUrl + '/' + id);
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
}
