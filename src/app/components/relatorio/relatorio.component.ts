import { Relatorio } from './../../models/relatorio.model';
import { MatTableDataSource } from '@angular/material/table';
import { RelatorioService } from './../../services/relatorio/relatorio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})

export class RelatorioComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  foods: Food[] = [
    { value: 'Plinio', viewValue: 'Plinio' },
    { value: 'Gisele', viewValue: 'Gisele' },
  ];

  relatorio: MatTableDataSource<Relatorio>;
  errorMsg: string;
  displayedColumns: string[] = ['nomeDocente', 'tipoAtividade', 'dataInicio', 'dataFim', 'statusAtividade'];

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
  }

  gerarRelatorioPorDocente(id: number, status: string, dataInicio: Date, dataFim: Date): void {
    this.relatorioService.extrairRelatorioPorDocente(id, status, dataInicio, dataFim).subscribe(
      data => {
        this.relatorio = new MatTableDataSource(data);
        this.relatorio.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
        console.error(this.errorMsg);
      }
    );

  }

}
