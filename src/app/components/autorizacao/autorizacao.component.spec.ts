import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AutorizacaoComponent } from './autorizacao.component';
import { AutorizacaoService } from 'src/app/services/autorizacao/autorizacao.service';
import { AtividadeService } from 'src/app/services/atividade/atividade.service';
import { Autorizacao } from 'src/app/models/autorizacao.model';

describe('AutorizacaoComponent', () => {
  let component: AutorizacaoComponent;
  let fixture: ComponentFixture<AutorizacaoComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let autorizacaoService: AutorizacaoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacaoComponent ],
      providers: [AutorizacaoService, AtividadeService],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    autorizacaoService = new AutorizacaoService(httpClientSpy as any);
  });

  it('deve retornar lista de autorizacoes de atividades', (done: DoneFn) => {
    const autorizacoes: Autorizacao[] =
      [{ id: 1, status: 'EM_ANDAMENTO', dataCriacao: '14/10/2021', docente: 'LUCAS', 
      horas: 5, urgente: false, tipoAtividade: 'CONVENIO', atividadeId: 1 }];
  
    httpClientSpy.get.and.returnValue(autorizacoes);
  
    autorizacaoService.listarAutorizacoes().subscribe(
      heroes => {
        expect(heroes).toEqual(autorizacoes, 'autorizacoes');
        done();
      },
      done.fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
