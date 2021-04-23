import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeDetalheComponent } from './atividade-detalhe.component';

describe('AtividadeDetalheComponent', () => {
  let component: AtividadeDetalheComponent;
  let fixture: ComponentFixture<AtividadeDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadeDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtividadeDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
