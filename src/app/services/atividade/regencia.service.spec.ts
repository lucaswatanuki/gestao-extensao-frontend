import { TestBed } from '@angular/core/testing';

import { RegenciaService } from './regencia.service';

describe('RegenciaService', () => {
  let service: RegenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
