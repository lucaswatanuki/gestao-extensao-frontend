import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: TokenStorageService,
    private toast: ToastrService) { }
  private isAuthenticated: boolean = false;

  canActivate() {
    if (this.authService.getToken()) {
      return true;
    }
    this.toast.error('Usuário não autenticado! Realizar login.', 'Erro');
    this.router.navigate(['/login']);
    return false;
  }
}