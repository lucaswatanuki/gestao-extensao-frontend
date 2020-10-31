import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.api + 'api/test/user';
  private adminUrl = environment.api + 'api/test/admin';

  constructor(private http: HttpClient) { }

  getUserDashboard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getAdminDashboard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }
}
