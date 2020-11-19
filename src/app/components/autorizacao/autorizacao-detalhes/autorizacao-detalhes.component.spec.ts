import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacaoDetalhesComponent } from './autorizacao-detalhes.component';

describe('AutorizacaoDetalhesComponent', () => {
  let component: AutorizacaoDetalhesComponent;
  let fixture: ComponentFixture<AutorizacaoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacaoDetalhesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacaoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
