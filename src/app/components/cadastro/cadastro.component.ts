import { ToastrService } from 'ngx-toastr';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
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

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  cadastro = false;
  formularioCadastro: FormGroup;
  signupInfo: SignUpInfo;
  public telefoneMascara = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public cpfMascara = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];


  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar, private validateBrService: ValidateBrService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.formularioCadastro = this.formBuilder.group({
      usuario: new FormControl('', Validators.required),
      nome_completo: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      endereco: new FormControl(''),
      rf: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      cpf: new FormControl('', [Validators.required, this.validateBrService.cpf]),
      telefone: new FormControl('', [Validators.minLength(11)])
    });
  }

  login(): void {
    this.form.resetForm();
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string): void{
    this.snackBar.open(message, action, {
      duration: 15000,
      horizontalPosition: this.horizontalPosition
    });
  }

  onSubmit(form: FormGroupDirective): void {
    console.log(this.formularioCadastro);
    this.signupInfo = new SignUpInfo(
      this.formularioCadastro.get('nome_completo').value,
      this.formularioCadastro.get('usuario').value,
      this.formularioCadastro.get('email').value,
      this.formularioCadastro.get('senha').value,
      this.formularioCadastro.get('cpf').value,
      this.formularioCadastro.get('rf').value,
      this.formularioCadastro.get('endereco').value,
      this.formularioCadastro.get('telefone').value,
    );


    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.form.resetForm();
        this.openSnackBar('Foi enviado um email para confirmação de cadastro', 'OK');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
        this.toast.error(error.mensagem);
      }
    );
  }

}
