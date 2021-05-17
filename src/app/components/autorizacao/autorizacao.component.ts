import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Autorizacao } from './../../models/autorizacao.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ConfirmacaoDialogueComponent } from 'src/app/shared/confirmacao-dialogue/confirmacao-dialogue.component';


@Component({
  selector: 'app-autorizacao',
  templateUrl: './autorizacao.component.html',
  styleUrls: ['./autorizacao.component.scss']
})
export class AutorizacaoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  confirmacaoDialogueRef: MatDialogRef<ConfirmacaoDialogueComponent>;

  autorizacao: Autorizacao = new Autorizacao();
  autorizacoes: MatTableDataSource<Autorizacao>;
  errorMsg: string;
  displayedColumns = ['id', 'status', 'dataCriacao', 'docente', 'urgente', 'tipoAtividade', 'acoes'];

  constructor(private autorizacaoService: AutorizacaoService, public dialog: MatDialog, private router: Router, private atividadeService: AtividadeService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAutorizacoes();
  }

  getAutorizacoes(): void {
    this.autorizacaoService.listarAutorizacoes().subscribe(
      data => {
        this.autorizacoes = new MatTableDataSource(data);
        this.autorizacoes.sort = this.sort;
        this.autorizacoes.paginator = this.paginator;
      },
      erro => {
        this.errorMsg = `${erro.status}: ${JSON.parse(erro.error).message}`;
        console.error(this.errorMsg);
      }
    );
  }

  consultarDetalheAutorizacao(element: Autorizacao): void {
    if (element.tipoAtividade === 'CONVENIO') {
      this.router.navigate(['atividade/convenio', element.id])
    }

    if (element.tipoAtividade === 'CURSO') {
      this.router.navigate(['atividade/curso-extensao', element.id])
    }

    if (element.tipoAtividade === 'REGENCIA') {
      this.router.navigate(['atividade/regencia', element.id])
    }
  }

  excluirAtividade(id: number): void {
    this.atividadeService.excluirAtividade(id).subscribe(
      data => {
        this.openSnackBar('Atividade excluida com sucesso', 'OK');
        this.getAutorizacoes();
      }
    )
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition
    });
  }

  openConfirmationDialog(id: number, mensagem: string) {
    this.confirmacaoDialogueRef = this.dialog.open(ConfirmacaoDialogueComponent, {
      disableClose: false
    });
    this.confirmacaoDialogueRef.componentInstance.mensagem = mensagem;

      this.confirmacaoDialogueRef.afterClosed().subscribe(result => {
        if (result) {
          this.excluirAtividade(id);
        }
      });
    
  }

}
