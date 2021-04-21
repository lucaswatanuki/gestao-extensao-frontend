import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucaoDialogueComponent } from './devolucao-dialogue.component';

describe('DevolucaoDialogueComponent', () => {
  let component: DevolucaoDialogueComponent;
  let fixture: ComponentFixture<DevolucaoDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucaoDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucaoDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
