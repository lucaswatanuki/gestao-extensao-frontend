import { AutorizacaoService } from './../../services/autorizacao/autorizacao.service';
import { Autorizacao } from './../../models/autorizacao.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns = ['id', 'status', 'dataCriacao', 'docente', 'horas', 'urgente'];

  constructor(private autorizacaoService: AutorizacaoService) {}

  ngOnInit() {
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
    )
  }
}
