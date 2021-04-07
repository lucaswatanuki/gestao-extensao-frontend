import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from 'src/app/services/docente/docente.service';

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
  displayedColumns: string[] = ['matricula', 'nome', 'email', 'totalHorasEmAndamento', 'totalHorasFuturas'];
  currentYear: number;

  constructor(private docenteService: DocenteService) {}
  
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

}
