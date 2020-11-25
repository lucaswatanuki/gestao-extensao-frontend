import { Dashboard } from './../../models/dashboard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.api + 'dashboard';

  constructor(private http: HttpClient) { }

  getDadosDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.baseUrl + '/dados');
  }

}
