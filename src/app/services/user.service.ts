import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.api + 'api/test/user';
  private adminUrl = environment.api + 'api/test/admin';
  private baseUrl = environment.api + 'usuario';

  constructor(private http: HttpClient) { }

  getUserDashboard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getAdminDashboard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
