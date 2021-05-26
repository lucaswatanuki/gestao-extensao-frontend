import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { Alocacao } from 'src/app/models/alocacao.model';
import { Arquivo } from 'src/app/models/arquivo.model';
import { Atividade } from 'src/app/models/atividade.model';
import { Autorizacao } from 'src/app/models/autorizacao.model';
import { Regencia } from 'src/app/models/regencia.model';
import { ExportService } from 'src/app/services/arquivo.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { AutorizacaoService } from 'src/app/services/autorizacao/autorizacao.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UploadArquivoService } from 'src/app/services/upload/upload-arquivo.service';
import { ConfirmacaoDialogueComponent } from 'src/app/shared/confirmacao-dialogue/confirmacao-dialogue.component';
import { DevolucaoDialogueComponent } from '../../autorizacao/autorizacao-detalhes/devolucao-dialogue/devolucao-dialogue.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AlocacaoDialogueComponent } from '../../alocacoes/alocacao-dialogue/alocacao-dialogue.component';

@Component({
  selector: 'app-regencia',
  templateUrl: './regencia.component.html',
  styleUrls: ['./regencia.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RegenciaComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  atividade: Regencia;
  regenciaForm: FormGroup;
  admin = false;
  user = false;
  private roles: string[];
  currentYear: number;
  confirmacaoDialogueRef: MatDialogRef<ConfirmacaoDialogueComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  fileInfos$: Observable<Arquivo[]>;
  autorizacao: Autorizacao;
  loading$ = this.loader.loading$;
  pdf$ = false;
  arquivo$ = false;
  alocacoes: MatTableDataSource<Alocacao>;
  columnsToDisplay: string[] = ['semestre', 'ano', 'horasSolicitadas', 'status'];

  constructor(private route: ActivatedRoute, private fbuilder: FormBuilder,
    private atividadeService: AtividadeService, private tokenStorage: TokenStorageService,
    private autorizacaoService: AutorizacaoService, public dialog: MatDialog, private snackBar: MatSnackBar,
    private uploadService: UploadArquivoService, private router: Router, private arquivoService: ExportService,
    private loader: LoaderService) { }

  ngOnInit(): void {
    this.atividade = new Regencia();
    this.currentYear = new Date().getFullYear();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.admin = this.roles.includes('ROLE_ADMIN');
      this.user = this.roles.includes('ROLE_USER');
    }

    this.getRegencias();

    this.regenciaForm = this.fbuilder.group({
      nivel: [null, Validators.required],
      curso: [null, Validators.required],
      coordenador: [null, Validators.required],
      disciplinaParticipacao: [null],
      cargaHoraTotalMinistrada: [null, Validators.required],
      cargaHorariaTotalDedicada: [null],
      valorBrutoHoraAula: [null, Validators.required],
      valorBrutoTotalAula: [null, Validators.required],
      valorBrutoOutraAtividade: [null, Validators.required],
      instituicao: [null, Validators.required],
      diasTrabalhadosUnicamp: [null, Validators.required],
      diasTrabalhadosOutraInstituicao: [null, Validators.required],
      responsavel: [null, Validators.required],
      unicoDocente: [null, Validators.required],
      dataInicio: [null, Validators.required],
      dataFim: [null, Validators.required],
      horaSemanal: [null, Validators.required],
      horaMensal: [null, Validators.required],
      observacao: [null],
      ano: [null],
      semestre: [null],
      horasSolicitadas: [null],
      ano2: [null],
      semestre2: [null],
      horasSolicitadas2: [null],
      revisao: [null],
      docente: [null]
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

  getRegencias(): void {
    this.atividadeService.consultarRegencia(this.route.snapshot.params['id']).subscribe(
      response => {
        console.log(response);
        this.atividade = response;
        this.alocacoes = new MatTableDataSource(response.alocacoes);
        this.alocacoes.paginator = this.paginator;

        this.fileInfos$ = this.uploadService.getArquivos(this.atividade.id);
      },
      error => {
        console.log(error);
      });
  }

  updateRegencia(): void {
    this.atividadeService.updateRegencia(this.atividade).subscribe(
      res => {
        this.getRegencias();
        this.openSnackBar('Dados de atividade atualizados com sucesso', 'OK');
      },
      error => {
        console.log(error);
      });
  }

  extrairRelatorioPDF(atividade: Atividade): void {
    this.pdf$ = true;
    this.arquivo$ = false;
    this.arquivoService.extrairRelatorioPDF(atividade);
  }

  openConfirmationDialog(atividade: Atividade, mensagem: string, aceitar: boolean, operacao: string) {
    this.confirmacaoDialogueRef = this.dialog.open(ConfirmacaoDialogueComponent, {
      disableClose: false
    });
    this.confirmacaoDialogueRef.componentInstance.mensagem = mensagem;

    if (operacao === 'aceitar') {
      this.confirmacaoDialogueRef.afterClosed().subscribe(result => {
        if (result && aceitar) {
          atividade.autorizado = true;
          this.autorizarAtividade(atividade);
        }
      });
    }

    if (operacao === 'update') {
      this.confirmacaoDialogueRef.afterClosed().subscribe(result => {
        if (result && aceitar) {
          this.updateRegencia();
        }
      });
    }
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(AlocacaoDialogueComponent, {
      width: '300px',
      data: {
        element
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
    this.arquivo$ = true;
    this.pdf$ = false;
    this.arquivoService.downloadArquivo(arquivo, atividade);
  }

  voltar(): void {
    this.router.navigate(['autorizacoes']);
  }

}
