import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente/docente.service';
import { DocenteDetalheComponent } from './docente-detalhe/docente-detalhe.component';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss']
})
export class DocenteComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  docente: Docente = new Docente();
  docentes: MatTableDataSource<any>;
  errorMsg: string;
  displayedColumns: string[] = ['matricula', 'nome', 'email', 'alocacoes'];
  currentYear: number;
  dataGrid: Docente[];

  constructor(private docenteService: DocenteService, public dialog: MatDialog) {
    this.docentes = new MatTableDataSource(this.dataGrid);
  }
  
  ngOnInit() {
    this.getDocentes();
  }

  getDocentes(): void {
    this.currentYear = new Date().getFullYear();
     this.docenteService.listarDocentes().subscribe(
       data => {
         this.docentes = new MatTableDataSource(data);
         this.docentes.paginator = this.paginator;
       },
       error => {
         this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
         console.error(this.errorMsg);
       }
     );
  }

  openDialogDocente(id: number): void {
    this.dialog.open(DocenteDetalheComponent, {
      data: {
        width: 'auto',
        height: 'auto',
        id
      }
    });
  }

  applyFilter(value: string) {
    this.docentes.filter = value.trim().toLowerCase();
  }

}
