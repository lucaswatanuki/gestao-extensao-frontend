import { AtividadeService } from './../../../services/atividade/atividade.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atividade } from 'src/app/models/atividade.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { AutorizacaoService } from 'src/app/services/autorizacao/autorizacao.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-autorizacao-detalhes',
  templateUrl: './autorizacao-detalhes.component.html',
  styleUrls: ['./autorizacao-detalhes.component.scss']
})
export class AutorizacaoDetalhesComponent implements OnInit {

  @ViewChild('content', {static: false}) content: ElementRef;

  atividade: Atividade = new Atividade();
  formularioAtividade: FormGroup;
  admin = false;
  user = false;
  private roles: string[];
  currentYear: number;

  constructor(public dialogRef: MatDialogRef<AutorizacaoDetalhesComponent>, private fbuilder: FormBuilder, 
    private atividadeService: AtividadeService, @Inject(MAT_DIALOG_DATA) public data, private tokenStorage: TokenStorageService,
    private autorizacaoService: AutorizacaoService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();

      this.admin = this.roles.includes('ROLE_ADMIN');
      this.user = this.roles.includes('ROLE_USER');
    }
    this.formularioAtividade = this.fbuilder.group({
      projeto: new FormControl(''),
      id: new FormControl(''),
      horaMensal: new FormControl(''),
      horaSemanal: new FormControl(''),
      prazo: new FormControl(''),
      valor: new FormControl(''),
      dataInicio: new FormControl(''),
      dataFim: new FormControl(''),
      docente: new FormControl(''),
      horasEmAndamento: new FormControl(''),
      horasFuturas: new FormControl(''),
      observacao: new FormControl(''),
    });
    if (this.data.id) {
      this.atividadeService.consultarAtividade(this.data.id).subscribe(
        response => {
          console.log(response);
          this.atividade.projeto = response.projeto;
          this.atividade.id = response.id;
          this.atividade.horaMensal = response.horaMensal;
          this.atividade.horaSemanal = response.horaSemanal;
          this.atividade.prazo = response.prazo;
          this.atividade.valorBruto = response.valorBruto;
          this.atividade.dataInicio = response.dataInicio;
          this.atividade.dataFim = response.dataFim;
          this.atividade.docente = response.docente;
          this.atividade.horasAprovadas = response.horasAprovadas;
          this.atividade.horasSolicitadas = response.horasSolicitadas;
          this.atividade.observacao = response.observacao;
          this.atividade.autorizado = response.autorizado;
          this.atividade.tipoAtividade = response.tipoAtividade;
      },
      error => {
        console.log(error);
      });
    }
  }

  autorizarAtividade(atividade: Atividade): void{
    this.autorizacaoService.autorizar(atividade).subscribe(
      res => {
        this.dialogRef.close();
        console.log("Atividade autorizada com sucesso");
      },
      error => {console.log(error);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
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
