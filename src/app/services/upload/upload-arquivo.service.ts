import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arquivo } from 'src/app/models/arquivo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadArquivoService {

  private baseUrl = environment.api + 'arquivos';

  constructor(private http: HttpClient) { }

  upload(file: File, atividadeId: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload/${atividadeId}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getArquivos(atividadeId: number) {
    return this.http.get<Arquivo[]>(this.baseUrl + '/' + atividadeId);
  }

  download(arquivoId: number): Observable<Blob>  {
    return this.http.get(this.baseUrl + '/download/' + arquivoId, {responseType: 'blob'});
  }

}
