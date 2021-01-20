import { DocenteService } from './../../services/docente/docente.service';
import { Docente } from './../../models/docente.model';
import { Relatorio } from './../../models/relatorio.model';
import { MatTableDataSource } from '@angular/material/table';
import { RelatorioService } from './../../services/relatorio/relatorio.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  relatorio: MatTableDataSource<Relatorio>;
  errorMsg: string;
  displayedColumns: string[] = ['nomeDocente', 'tipoAtividade', 'dataInicio', 'dataFim', 'statusAtividade'];

  constructor(private relatorioService: RelatorioService, public dialog: MatDialog) { }

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

  openDialogDocente(): void {
    const dialogRef = this.dialog.open(RelatorioDocenteSearchDialogueComponent, {
      data: {
        width: 'auto',
        height: 'auto',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      //this.formCotacao.get('produto').setValue(result.id);
    });
  }

}


//SUBCOMPONENT SEARCHING TABLE
@Component({
  selector: 'relatorio-search-docente',
  templateUrl: './relatorio-search-docente.component.html',
  styleUrls: ['./relatorio.component.scss']
})

export class RelatorioDocenteSearchDialogueComponent {

  deocente: Docente = new Docente();
  listaProduto: Docente[] = [];

  nextpage = true;

  displayedColumns: string[] = ['id', 'nome', 'matricula', 'select'];
  source: MatTableDataSource<Request>;
  selection = new SelectionModel<Request>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataGrid: Request[];
  selection3 = new SelectionModel<Request>(false, []);
  errorMsg: string;

  constructor(
    public dialogRef: MatDialogRef<RelatorioDocenteSearchDialogueComponent>,
    private docenteService: DocenteService,
    public dialog: MatDialog) {
    this.source = new MatTableDataSource(this.dataGrid);
  }

  ngOnInit() {
    this.getDocentes();
  }

  applyFilter(value: string) {
    this.source.filter = value.trim().toLowerCase();
  }

  public getDocentes(): void {
    this.docenteService.listarDocentes().subscribe(
      data => {
        this.source = new MatTableDataSource(data);
        this.source.paginator = this.paginator;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  selectRow(row) {
    console.log(row);
    this.dialogRef.close(row);
  }
}
