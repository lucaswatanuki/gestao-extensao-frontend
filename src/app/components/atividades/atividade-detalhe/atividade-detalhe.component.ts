import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { Arquivo } from 'src/app/models/arquivo.model';
import { Atividade } from 'src/app/models/atividade.model';
import { Autorizacao } from 'src/app/models/autorizacao.model';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { AutorizacaoService } from 'src/app/services/autorizacao/autorizacao.service';
import { UploadArquivoService } from 'src/app/services/upload/upload-arquivo.service';
import { ConfirmacaoDialogueComponent } from 'src/app/shared/confirmacao-dialogue/confirmacao-dialogue.component';
import { DevolucaoDialogueComponent } from '../../autorizacao/autorizacao-detalhes/devolucao-dialogue/devolucao-dialogue.component';

@Component({
  selector: 'app-atividade-detalhe',
  templateUrl: './atividade-detalhe.component.html',
  styleUrls: ['./atividade-detalhe.component.scss']
})
export class AtividadeDetalheComponent implements OnInit {

  atividade: Atividade;
  formularioAtividade: FormGroup;
  admin = false;
  user = false;
  private roles: string[];
  currentYear: number;
  confirmacaoDialogueRef: MatDialogRef<ConfirmacaoDialogueComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  fileInfos$: Observable<Arquivo[]>;
  autorizacao: Autorizacao

  constructor(private route: ActivatedRoute, private fbuilder: FormBuilder,
    private atividadeService: AtividadeService, private tokenStorage: TokenStorageService,
    private autorizacaoService: AutorizacaoService, private datePipe: DatePipe, public dialog: MatDialog, private snackBar: MatSnackBar,
    private uploadService: UploadArquivoService, private router: Router) { }

  ngOnInit(): void {
    this.atividade = new Atividade();
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
      revisao: new FormControl(''),
    });

    this.atividadeService.consultarAtividade(this.route.snapshot.params['id']).subscribe(
      response => {
        console.log(response);
        this.atividade = response;

        this.fileInfos$ = this.uploadService.getArquivos(this.atividade.id);
      },
      error => {
        console.log(error);
      });

  }

  autorizarAtividade(atividade: Atividade): void {
    this.autorizacaoService.autorizar(atividade).subscribe(
      res => {
        console.log("Atividade autorizada com sucesso");
      },
      error => {
        console.log(error);
      });
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

  openConfirmationDialog(atividade: Atividade, mensagem: string, aceitar: boolean) {
    this.confirmacaoDialogueRef = this.dialog.open(ConfirmacaoDialogueComponent, {
      disableClose: false
    });
    this.confirmacaoDialogueRef.componentInstance.mensagem = mensagem;

    this.confirmacaoDialogueRef.afterClosed().subscribe(result => {
      if (result && aceitar) {
        atividade.autorizado = true;
        this.autorizarAtividade(atividade);
        this.openSnackBar('Atividade aceita com sucesso!', 'OK')
      }
    });
  }

  devolverAtividade(id: number): void {
    const dialogRef = this.dialog.open(DevolucaoDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
        id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar('Atividade devolvida para revisão', 'OK')
      }
    }
    );
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition
    });
  }

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

  voltar(): void {
    this.router.navigate(['autorizacoes']);
  }

}
