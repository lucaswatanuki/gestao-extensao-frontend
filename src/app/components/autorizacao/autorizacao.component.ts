import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Autorizacao } from './../../models/autorizacao.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-autorizacao',
  templateUrl: './autorizacao.component.html',
  styleUrls: ['./autorizacao.component.scss']
})
export class AutorizacaoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  autorizacao: Autorizacao = new Autorizacao();
  autorizacoes: MatTableDataSource<Autorizacao>;
  errorMsg: string;
  displayedColumns = ['id', 'status', 'dataCriacao', 'docente', 'horas', 'urgente', 'tipoAtividade', 'abrir'];

  constructor(private autorizacaoService: AutorizacaoService, public dialog: MatDialog, private router: Router) { }

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

    if (element.tipoAtividade === 'CURSO_EXTENSAO') {
      this.router.navigate(['atividade/curso-extensao', element.id])
    }

    if (element.tipoAtividade === 'REGENCIA') {
      this.router.navigate(['atividade/regencia', element.id])
    }
  }

}
