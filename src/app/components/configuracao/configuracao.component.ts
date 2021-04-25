import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { Usuario } from 'src/app/models/usuario.model';
import { DocenteService } from 'src/app/services/docente/docente.service';
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

  constructor(private docenteService: DocenteService, private tokenService: TokenStorageService, private fbuilder: FormBuilder) { }

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

}
