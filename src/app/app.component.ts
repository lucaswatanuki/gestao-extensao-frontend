import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenStorageService } from './core/auth/token-storage.service';
import { environment } from 'src/environments/environment';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Gestão Extensão';
  private roles: string[];
  public authority = false;
  info: any;
  admin = false;
  user = false;
  isLoggedIn$ = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private tokenStorage: TokenStorageService, public loaderService: LoaderService) { }

  ngOnInit(): void {

    this.isLoggedIn$ = this.tokenStorage.isLogged();

    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      authorities: this.tokenStorage.getAuthorities(),
      email: this.tokenStorage.getEmail(),
    };

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();

      this.admin = this.roles.includes('ROLE_ADMIN');
      this.user = this.roles.includes('ROLE_USER');

    }
  }


  logout(): void {
    this.tokenStorage.signOut();
    window.location.replace(environment.localhost + 'login');
  }
}
