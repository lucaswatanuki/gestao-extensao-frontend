import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivityFormComponent } from './components/formulario/activity-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { httpInterceptorProviders } from './core/auth/auth-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AutorizacaoComponent } from './components/autorizacao/autorizacao.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { DocenteComponent } from './components/docente/docente.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { AutorizacaoDetalhesComponent } from './components/autorizacao/autorizacao-detalhes/autorizacao-detalhes.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActivityFormComponent,
    DocenteComponent,
    RelatorioComponent,
    LoginComponent,
    CadastroComponent,
    AutorizacaoComponent,
    ConfiguracaoComponent,
    AutorizacaoDetalhesComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HammerModule,
    TextMaskModule,
    AngularValidateBrLibModule
  ],
  providers: [AuthGuardService, httpInterceptorProviders, AutorizacaoDetalhesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
