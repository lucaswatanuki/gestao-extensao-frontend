import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegenciaService {

  private baseUrl = environment.api + 'atividade';

  constructor() { }
}
