import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SignUpInfo } from 'src/app/core/auth/signup-info';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class CadastroComponent implements OnInit {

  formularioCadastro: FormGroup;
  signupInfo: SignUpInfo;

  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formularioCadastro = this.formBuilder.group({
      usuario: new FormControl('', Validators.required),
      nome_completo: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      endereco: new FormControl('', Validators.required),
      rf: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cpf: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required, Validators.minLength(11)])
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  onSubmit(form: FormGroupDirective) {
    console.log(this.formularioCadastro);
    this.signupInfo = new SignUpInfo(
      this.formularioCadastro.get('nome_completo').value,
      this.formularioCadastro.get('usuario').value,
      this.formularioCadastro.get('email').value,
      this.formularioCadastro.get('senha').value,
      this.formularioCadastro.get('cpf').value,
      this.formularioCadastro.get('endereco').value,
      this.formularioCadastro.get('rf').value,
      this.formularioCadastro.get('telefone').value,
    );


    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.form.resetForm();
        this.openSnackBar('Usuário criado com sucesso!', 'OK');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
