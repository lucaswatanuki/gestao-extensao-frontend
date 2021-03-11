import { AutorizacaoDetalhesComponent } from './autorizacao-detalhes/autorizacao-detalhes.component';
import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Autorizacao } from './../../models/autorizacao.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-autorizacao',
  templateUrl: './autorizacao.component.html',
  styleUrls: ['./autorizacao.component.scss']
})
export class AutorizacaoComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  autorizacao: Autorizacao = new Autorizacao();
  autorizacoes: MatTableDataSource<Autorizacao>;
  errorMsg: string;
  displayedColumns = ['id', 'status', 'dataCriacao', 'docente', 'horas', 'urgente', 'abrir'];

  constructor(private autorizacaoService: AutorizacaoService, public dialog: MatDialog) {}

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

  consultarDetalheAutorizacao(id: number): void {
    const dialogRef = this.dialog.open(AutorizacaoDetalhesComponent, {
      data: {
        width: 'auto',
        height: 'auto',
        id
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        this.getAutorizacoes();
      }
    );
  }

}
