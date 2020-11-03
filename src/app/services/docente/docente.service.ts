import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/docente.model';
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
}
