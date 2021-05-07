import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alocacao } from 'src/app/models/alocacao.model';
import { Docente } from 'src/app/models/docente.model';
import { Senha } from 'src/app/models/senha.model';
import { Usuario } from 'src/app/models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class DocenteService {

  private baseUrl = environment.api + 'docente';

  constructor(private http: HttpClient) { }

  listarDocentes(): Observable<any> {
    return this.http.get<Docente[]>(this.baseUrl + '/todos');
  }

  consultarAlocacoesDocente(docenteId: number): Observable<any> {
    return this.http.get<Alocacao[]>(`${this.baseUrl}/${docenteId}/alocacoes`);
  }

  consultarAlocacoes(): Observable<any> {
    return this.http.get<Alocacao[]>(`${this.baseUrl}/alocacoes`);
  }

  getDadosUsuario(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  alterarDadosUsuario(id: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, usuario);
  }

  alterarSenha(request: Senha, userId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${userId}/alterarSenha`, request);
  }
}
