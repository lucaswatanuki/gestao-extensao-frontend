import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityFormComponent } from './components/formulario/activity-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { TabelaComponent } from './components/tabela/tabela.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'criar-atividade', component: ActivityFormComponent
  },
  {
    path: 'docentes', component: TabelaComponent
  },
  {
    path: 'relatorio', component: RelatorioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
