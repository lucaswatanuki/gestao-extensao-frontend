import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { CustomValidators } from 'ng2-validation';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { Senha } from 'src/app/models/senha.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DocenteService } from 'src/app/services/docente/docente.service';
import { SenhaService } from 'src/app/services/senha/senha.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  userId: number;
  usuario: Usuario;
  userForm: FormGroup;
  senhaForm: FormGroup;
  senhaModel: Senha;

  constructor(private docenteService: DocenteService, private tokenService: TokenStorageService, private fbuilder: FormBuilder, private senhaService: SenhaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuario = new Usuario();

    this.userForm = this.fbuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      matricula: new FormControl(''),
      endereco: new FormControl('')
    });

    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', CustomValidators.equalTo(senha));

    this.senhaModel = new Senha();
    
    this.senhaForm = this.fbuilder.group({
      oldPassword: new FormControl(''),
      senha: senha,
      senhaConfirmacao: senhaConfirmacao,
     })

    this.getDadosUsuario();

  }

  getDadosUsuario(): void {
    this.userId = parseInt(this.tokenService.getUserId());
    this.docenteService.getDadosUsuario(this.userId).subscribe(
      response => {
        this.usuario = response;
      }
    )
  }

  alterarSenha() {
    this.senhaModel.senha = this.senhaForm.get('senha').value;
    this.senhaModel.senhaAtual = this.senhaForm.get('oldPassword').value;
    
    this.docenteService.alterarSenha(this.senhaModel).subscribe(
      data => {
         this.openSnackBar('Senha alterada com sucesso!', 'OK');
      },
      error => {
         this.openSnackBar('Não foi possível alterar a senha', 'OK');
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
