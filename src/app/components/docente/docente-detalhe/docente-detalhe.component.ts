import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Alocacao } from 'src/app/models/alocacao.model';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente/docente.service';

@Component({
  selector: 'app-docente-detalhe',
  templateUrl: './docente-detalhe.component.html',
  styleUrls: ['./docente-detalhe.component.scss']
})
export class DocenteDetalheComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  id: number;
  docente: Docente;
  alocacao: Alocacao[];
  alocacoes: MatTableDataSource<Alocacao>;
  errorMsg: string;
  displayedColumns: string[] = ['tipoAtividade', 'semestre', 'ano', 'horasAprovadas'];

  constructor(private docenteService: DocenteService, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.getAlocacoes(this.data.id);

  }

  getAlocacoes(id: number): void {
    this.docenteService.consultarAlocacoes(id).subscribe(
      data => {
        this.alocacoes = new MatTableDataSource(data);
        this.alocacoes.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
        console.error(this.errorMsg);
      });
  }

  applyFilter(value: string) {
    this.alocacoes.filter = value.trim().toLowerCase();
  }


}
