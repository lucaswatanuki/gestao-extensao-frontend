import { DocenteService } from './services/docente/docente.service';
import { RelatorioService } from './services/relatorio/relatorio.service';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivityFormComponent } from './components/formulario/activity-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RelatorioComponent, RelatorioDocenteSearchDialogueComponent } from './components/relatorio/relatorio.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { httpInterceptorProviders } from './core/auth/auth-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AutorizacaoComponent } from './components/autorizacao/autorizacao.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { DocenteComponent } from './components/docente/docente.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { ConfirmacaoDialogueComponent } from './shared/confirmacao-dialogue/confirmacao-dialogue.component';
import { DevolucaoDialogueComponent } from './components/autorizacao/autorizacao-detalhes/devolucao-dialogue/devolucao-dialogue.component';
import { AtividadeDetalheComponent } from './components/atividades/atividade-detalhe/atividade-detalhe.component';
import { DocenteDetalheComponent } from './components/docente/docente-detalhe/docente-detalhe.component';
import { ResetSenhaComponent } from './components/senha/reset-senha/reset-senha.component';
import { UpdateSenhaComponent } from './components/senha/update/update-senha/update-senha.component';

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
    RelatorioDocenteSearchDialogueComponent,
    ConfirmacaoDialogueComponent,
    DevolucaoDialogueComponent,
    AtividadeDetalheComponent,
    DocenteDetalheComponent,
    ResetSenhaComponent,
    UpdateSenhaComponent,
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
    AngularValidateBrLibModule,
  ],
  providers: [AuthGuardService, httpInterceptorProviders, RelatorioService, DocenteService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
