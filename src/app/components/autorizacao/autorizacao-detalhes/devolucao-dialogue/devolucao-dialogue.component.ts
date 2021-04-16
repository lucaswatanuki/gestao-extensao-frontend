import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atividade } from 'src/app/models/atividade.model';
import { AutorizacaoService } from 'src/app/services/autorizacao/autorizacao.service';

@Component({
  selector: 'app-devolucao-dialogue',
  templateUrl: './devolucao-dialogue.component.html',
  styleUrls: ['./devolucao-dialogue.component.scss']
})
export class DevolucaoDialogueComponent implements OnInit {

  atividade: Atividade = new Atividade();

  constructor(public dialogRef: MatDialogRef<DevolucaoDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data, private autorizacaoService: AutorizacaoService) { }

  ngOnInit(): void {
    this.atividade.id = this.data.id;
  }

  devolverAtividade(atividade: Atividade): void {
    this.atividade.autorizado = false;
    this.autorizacaoService.autorizar(atividade).subscribe(
      res => {
        this.dialogRef.close(true);
      },
      error => {
        console.log(error);
      });
  }

}
