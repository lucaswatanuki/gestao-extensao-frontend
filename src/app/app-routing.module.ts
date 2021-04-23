import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityFormComponent } from './components/formulario/activity-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { DocenteComponent } from './components/docente/docente.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AutorizacaoComponent } from './components/autorizacao/autorizacao.component';
import { ConfiguracaoComponent } from './components/configuracao/configuracao.component';
import { AtividadeDetalheComponent } from './components/atividades/atividade-detalhe/atividade-detalhe.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'criar-atividade', component: ActivityFormComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'docentes', component: DocenteComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'autorizacoes', component: AutorizacaoComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'relatorio', component: RelatorioComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'configuracao', component: ConfiguracaoComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'signup', component: CadastroComponent
  },
  {
    path: 'atividade/:id', component: AtividadeDetalheComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
