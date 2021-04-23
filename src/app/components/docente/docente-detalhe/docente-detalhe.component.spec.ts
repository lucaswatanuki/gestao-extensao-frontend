import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteDetalheComponent } from './docente-detalhe.component';

describe('DocenteDetalheComponent', () => {
  let component: DocenteDetalheComponent;
  let fixture: ComponentFixture<DocenteDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteDetalheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
