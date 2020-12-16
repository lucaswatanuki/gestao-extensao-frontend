import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss']
})

export class RelatorioComponent implements OnInit {

  foods: Food[] = [
    {value: 'Plinio', viewValue: 'Plinio'},
    {value: 'Gisele', viewValue: 'Gisele'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
