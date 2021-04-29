import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { Senha } from 'src/app/models/senha.model';
import { Usuario } from 'src/app/models/usuario.model';
import { DocenteService } from 'src/app/services/docente/docente.service';
import { SenhaService } from 'src/app/services/senha/senha.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit {

  userId: number;
  usuario: Usuario;
  userForm: FormGroup;
  senhaForm: FormGroup;
  senhaModel: Senha;

  constructor(private docenteService: DocenteService, private tokenService: TokenStorageService, private fbuilder: FormBuilder, private senhaService: SenhaService) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    
    this.userForm = this.fbuilder.group({
      nome: new FormControl(''),
      email: new FormControl(''),
      telefone: new FormControl(''),
      matricula: new FormControl(''),
      senhaAtual: new FormControl(''),
      senhaNova: new FormControl(''),
      senhaConfirmacao: new FormControl(''),
      endereco: new FormControl('')
    });

    // this.senhaForm = this.fbuilder.group({
    //   senha:
    //   // senhaConfirmacao:
    //   // senhaAtual:
    // })

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
    this.senhaModel.senhaAtual = this.senhaForm.get('senhaAtual').value;

    this.senhaService.alterarSenha(this.senhaModel).subscribe(
      data => {
        // this.openSnackBar('Senha alterada com sucesso!', 'OK');
        // this.loadLogin();
      },
      error => {
        // this.openSnackBar('Não foi possível alterar a senha', 'OK');
        // this.loadLogin();
      }
    )
  }

}
