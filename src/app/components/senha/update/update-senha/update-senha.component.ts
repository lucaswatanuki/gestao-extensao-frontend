import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { error } from 'selenium-webdriver';
import { Senha } from 'src/app/models/senha.model';
import { SenhaService } from 'src/app/services/senha/senha.service';

@Component({
  selector: 'app-update-senha',
  templateUrl: './update-senha.component.html',
  styleUrls: ['./update-senha.component.scss']
})
export class UpdateSenhaComponent implements OnInit {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  model: Senha;
  senhaForm: FormGroup;
  token: string;

  constructor(public router: Router, private fbuilder: FormBuilder, private senhaService: SenhaService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
    this.senhaService.verificarTokenSenha(this.token).subscribe(
      response => {
        if (response.valido === false) {
          this.loadLogin();
        }
      },
      error => {
        console.log(error);
        this.loadLogin();
      }
    )
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let confirmarSenha = new FormControl('', CustomValidators.equalTo(senha));
    this.model = new Senha();

    this.senhaForm = this.fbuilder.group({
      senha: senha,
      confirmarSenha: confirmarSenha
    });
  }

  loadLogin() {
    this.router.navigate(['/login']);
  }

  alterarSenha() {
    this.model.senha = this.senhaForm.get('senha').value;
    this.model.token = this.token;
    this.senhaService.alterarSenha(this.model).subscribe(
      data => {
        this.openSnackBar('Senha alterada com sucesso!', 'OK');
        this.loadLogin();
      },
      error => {
        this.openSnackBar('Não foi possível alterar a senha', 'OK');
        this.loadLogin();
      }
    )
  }

  openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {
      duration: 15000,
      horizontalPosition: this.horizontalPosition
    });
  }

}
