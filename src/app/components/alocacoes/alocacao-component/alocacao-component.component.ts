import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Alocacao } from 'src/app/models/alocacao.model';
import { DocenteService } from 'src/app/services/docente/docente.service';

@Component({
  selector: 'app-alocacao-component',
  templateUrl: './alocacao-component.component.html',
  styleUrls: ['./alocacao-component.component.scss']
})
export class AlocacaoComponentComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  id: number;
  alocacao: Alocacao[];
  alocacoes: MatTableDataSource<Alocacao>;
  errorMsg: string;
  displayedColumns: string[] = ['id', 'tipoAtividade', 'semestre', 'ano', 'horasAprovadas'];

  constructor(private docenteService: DocenteService) { }

  ngOnInit(): void {
      this.getAlocacoes();
  }

  getAlocacoes(): void {
    this.docenteService.consultarAlocacoes().subscribe(
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
