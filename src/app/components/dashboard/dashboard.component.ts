import { Dashboard } from './../../models/dashboard.model';
import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Autorizacao } from './../../models/autorizacao.model';
import { Atividade } from './../../models/atividade.model';
import { Docente } from './../../models/docente.model';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dashboard: Dashboard = new Dashboard();
  errorMsg: string;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Atividades', cols: 1, rows: 1 },
          { title: 'Autorizações', cols: 1, rows: 1 },
          { title: 'Docentes', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Atividades', cols: 2, rows: 1 },
        { title: 'Autorizações', cols: 1, rows: 1 },
        { title: 'Docentes', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDadosDashboard();
  }

  public getDadosDashboard(): void {
    this.dashboardService.getDadosDashboard().subscribe(
      data => {
        console.log(data);
        this.dashboard = data;
      },
      error => {
        this.errorMsg = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
