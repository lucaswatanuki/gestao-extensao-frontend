import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Alocacao } from 'src/app/models/alocacao.model';
import { DocenteService } from 'src/app/services/docente/docente.service';

@Component({
  selector: 'app-alocacao-dialogue',
  templateUrl: './alocacao-dialogue.component.html',
  styleUrls: ['./alocacao-dialogue.component.scss']
})
export class AlocacaoDialogueComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  alocacao: Alocacao = new Alocacao();

  alocacaoForm: FormGroup;

  constructor(
    private docenteService: DocenteService,
    public dialog: MatDialog,
    private fbuilder: FormBuilder,
    public dialogRef: MatDialogRef<AlocacaoDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (this.data.element) {
      this.alocacao = this.data.element;
    }
    this.alocacaoForm = this.fbuilder.group({
      ano: new FormControl('', Validators.required),
      semestre: new FormControl('', Validators.required),
      horasSolicitadas: new FormControl('', Validators.required),
      horasAprovadas: new FormControl('', Validators.required),
      tipoAtividade: new FormControl('', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateAlocacao(): void {
    this.docenteService.updateAlocacao(this.alocacao).subscribe(
      data => {
        this.dialogRef.close();
        this.openSnackBar('Alocação atualizada com sucesso!', 'OK');
      },
      error => { console.log(error); }
    );
  }


  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: this.horizontalPosition
    });
  }

}
