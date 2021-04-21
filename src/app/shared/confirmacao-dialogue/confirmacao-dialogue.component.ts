import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialogue',
  templateUrl: './confirmacao-dialogue.component.html',
  styleUrls: ['./confirmacao-dialogue.component.scss']
})
export class ConfirmacaoDialogueComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmacaoDialogueComponent>) { }

  public mensagem: string;

}
