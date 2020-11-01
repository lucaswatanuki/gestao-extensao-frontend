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

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  showFail() {
    this.toast.show('Verificar usuário e senha', 'Erro ao realizar login');
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.login(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.profiles);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();

        this.reloadPage();
      },
      error => {
        console.log(error);
        this.isLoginFailed = true;
        this.showFail();
      }
    );
  }

  loadSignUp() {
    this.router.navigate(['/signup']);
    //window.location.replace('http://localhost:4200/signup');
  }

  reloadPage() {
    window.location.replace(environment.localhost + 'dashboard');
  }

}
