import { HttpClient } from '@angular/common/http';
import { Atividade } from './../../models/atividade.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  private baseUrl = environment.api + 'atividade';

  constructor(private http: HttpClient) { }

  listarAtividades(): Observable<any> {
    return this.http.get<Atividade[]>(this.baseUrl + '/listar');
  }
}
