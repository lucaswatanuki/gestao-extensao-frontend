import { AtividadeService } from './../../../services/atividade/atividade.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Atividade } from 'src/app/models/atividade.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';

@Component({
  selector: 'app-autorizacao-detalhes',
  templateUrl: './autorizacao-detalhes.component.html',
  styleUrls: ['./autorizacao-detalhes.component.scss']
})
export class AutorizacaoDetalhesComponent implements OnInit {

  atividade: Atividade = new Atividade();
  formularioAtividade: FormGroup;
  admin = false;
  user = false;
  private roles: string[];

  constructor(public dialogRef: MatDialogRef<AutorizacaoDetalhesComponent>, private fbuilder: FormBuilder, 
    private atividadeService: AtividadeService, @Inject(MAT_DIALOG_DATA) public data, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();

      this.admin = this.roles.includes('ROLE_ADMIN');
      this.user = this.roles.includes('ROLE_USER');
    }
    this.formularioAtividade = this.fbuilder.group({
      projeto: new FormControl(''),
      id: new FormControl(''),
      horaMensal: new FormControl(''),
      horaSemanal: new FormControl(''),
      prazo: new FormControl(''),
      valor: new FormControl(''),
      dataInicio: new FormControl(''),
      dataFim: new FormControl(''),
      docente: new FormControl(''),
      horasEmAndamento: new FormControl(''),
      horasFuturas: new FormControl(''),
    });
    if (this.data.id) {
      this.atividadeService.consultarAtividade(this.data.id).subscribe(
        response => {
          console.log(response);
          this.atividade.projeto = response.projeto;
          this.atividade.id = response.id;
          this.atividade.horaMensal = response.horaMensal;
          this.atividade.horaSemanal = response.horaSemanal;
          this.atividade.prazo = response.prazo;
          this.atividade.valorBruto = response.valorBruto;
          this.atividade.dataInicio = response.dataInicio;
          this.atividade.dataFim = response.dataFim;
          this.atividade.docente = response.docente;
          this.atividade.horasEmAndamento = response.horasEmAndamento;
          this.atividade.horasFuturas = response.horasFuturas;
      },
      error => {
        console.log(error);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
