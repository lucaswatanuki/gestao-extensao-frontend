import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoExtensaoComponent } from './curso-extensao.component';

describe('CursoExtensaoComponent', () => {
  let component: CursoExtensaoComponent;
  let fixture: ComponentFixture<CursoExtensaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoExtensaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoExtensaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
