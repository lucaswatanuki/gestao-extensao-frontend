import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Arquivo } from '../models/arquivo.model';
import { Atividade } from '../models/atividade.model';
import { AtividadeService } from './atividade/atividade.service';
import { UploadArquivoService } from './upload/upload-arquivo.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private uploadService: UploadArquivoService, private atividadeService: AtividadeService, private datePipe: DatePipe) { }

  downloadArquivo(arquivo: Arquivo, atividade: Atividade): void {
    this.uploadService.download(atividade.id).subscribe(
      data => {
        const blob = new Blob([data], { type: arquivo.tipo });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const dados = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = dados;
        link.download = arquivo.nome;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))

        setTimeout(function () {
          window.URL.revokeObjectURL(dados);
          link.remove();
        }, 100);
      }
    );
  }

  extrairRelatorioPDF(atividade: Atividade): void {
    this.atividadeService.salvarAtividade(atividade).subscribe(
      data => {
        const blob = new Blob([data], { type: 'application/pdf' });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const dados = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = dados;
        var date = this.datePipe.transform(new Date(), "dd-MM-yyyy_HH:mm:ss");
        link.download = 'relatorio_' + date + '.pdf';
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }))

        setTimeout(function () {
          window.URL.revokeObjectURL(dados);
          link.remove();
        }, 100);
      }
    );
  }
}
