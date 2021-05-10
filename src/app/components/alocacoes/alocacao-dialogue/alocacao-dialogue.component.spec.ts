import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlocacaoDialogueComponent } from './alocacao-dialogue.component';

describe('AlocacaoDialogueComponent', () => {
  let component: AlocacaoDialogueComponent;
  let fixture: ComponentFixture<AlocacaoDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlocacaoDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlocacaoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
