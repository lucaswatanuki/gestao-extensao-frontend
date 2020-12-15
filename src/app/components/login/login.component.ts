import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthLoginInfo } from 'src/app/core/auth/login-info';
import { TokenStorageService } from 'src/app/core/auth/token-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService,
     private tokenStorage: TokenStorageService, 
    public router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  showFail(mensagem: string): void {
    this.toast.error(mensagem);
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

  reloadPage() {
    window.location.replace(environment.localhost + 'dashboard');
  }

}
