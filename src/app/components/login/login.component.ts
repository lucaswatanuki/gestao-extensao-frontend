import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthLoginInfo } from 'src/app/core/auth/login-info';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading$ = this.loader.loading$;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService,
     private tokenStorage: TokenStorageService, 
    public router: Router,
    private toast: ToastrService,
    private loader: LoaderService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  showFail(mensagem: string): void {
    this.toast.error(mensagem, "Erro");
  }

  onSubmit(): void {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.matricula,
      this.form.password);

    this.authService.login(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.profiles);
        this.tokenStorage.saveEmail(data.email);
        this.tokenStorage.saveId(data.id);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();

        if (this.roles.includes('ROLE_ADMIN')) {
          window.location.replace(environment.localhost + 'dashboard');
        } else { 
          window.location.replace(environment.localhost + 'criar-atividade');
        }
      },
      response => {
        console.log(response);
        this.isLoginFailed = true;
        this.showFail(response.error.mensagem);
      }
    );
  }

  loadSignUp() {
    this.router.navigate(['/signup']);
  }

  loadResetSenha() {
    this.router.navigate(['/senha/reset']);
  }

  reloadPage() {
    window.location.replace(environment.localhost + 'dashboard');
  }

}
