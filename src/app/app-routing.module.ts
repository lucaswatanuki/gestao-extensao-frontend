import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityFormComponent } from './components/formulario/activity-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './core/auth/auth-guard.service';
import { CadastroComponent } from './components/cadastro/cadastro.component';


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
    path: 'docentes', component: TabelaComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'relatorio', component: RelatorioComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: CadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
