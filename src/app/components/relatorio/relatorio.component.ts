import { DocenteService } from './../../services/docente/docente.service';
import { Docente } from './../../models/docente.model';
import { Relatorio } from './../../models/relatorio.model';
import { MatTableDataSource } from '@angular/material/table';
import { RelatorioService } from './../../services/relatorio/relatorio.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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

  formRelatorio: FormGroup;
  request: Relatorio = new Relatorio;
  relatorio: MatTableDataSource<Relatorio>;
  errorMsg: string;
  displayedColumns: string[] = ['nomeDocente', 'tipoAtividade', 'dataInicio', 'dataFim', 'prazo', 'statusAtividade'];

  constructor(private relatorioService: RelatorioService, public dialog: MatDialog, private fbuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.formRelatorio = this.fbuilder.group({
      inicio: new FormControl('', [Validators.required]),
      fim: new FormControl('', [Validators.required]),
      nomeDocente: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }

  gerarRelatorioPorDocente(request: Relatorio): void {
    this.relatorioService.extrairRelatorioPorDocente(request).subscribe(
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

  extrairRelatorioPDF(request: Relatorio): void {
    this.relatorioService.gerarPdf(request).subscribe(
      data => {
        const blob = new Blob([data], {type: 'application/pdf'});

        if(window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const dados = window.URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = dados;
        var date = this.datePipe.transform(new Date(),"dd-MM-yyyy_HH:mm:ss");
        link.download = 'relatorio_' + date + '.pdf';
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}))

        setTimeout(function() {
          window.URL.revokeObjectURL(dados);
          link.remove();
        }, 100);
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
      this.formRelatorio.get('nomeDocente').setValue(result.nome);
      this.request.idDocente = result.id;
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
