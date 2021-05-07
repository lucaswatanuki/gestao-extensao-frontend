import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoComponentComponent } from './alocacao-component.component';

describe('AlocacaoComponentComponent', () => {
  let component: AlocacaoComponentComponent;
  let fixture: ComponentFixture<AlocacaoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlocacaoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
