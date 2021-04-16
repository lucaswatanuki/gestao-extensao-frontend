import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacaoDialogueComponent } from './confirmacao-dialogue.component';

describe('ConfirmacaoDialogueComponent', () => {
  let component: ConfirmacaoDialogueComponent;
  let fixture: ComponentFixture<ConfirmacaoDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacaoDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacaoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
