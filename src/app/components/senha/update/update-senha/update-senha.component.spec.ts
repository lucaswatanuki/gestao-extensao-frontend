import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSenhaComponent } from './update-senha.component';

describe('UpdateSenhaComponent', () => {
  let component: UpdateSenhaComponent;
  let fixture: ComponentFixture<UpdateSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
