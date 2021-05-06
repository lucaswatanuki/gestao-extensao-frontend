import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegenciaComponent } from './regencia.component';

describe('RegenciaComponent', () => {
  let component: RegenciaComponent;
  let fixture: ComponentFixture<RegenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
