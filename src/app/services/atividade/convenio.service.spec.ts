import { TestBed } from '@angular/core/testing';

import { ConvenioService } from './convenio.service';

describe('ConvenioService', () => {
  let service: ConvenioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvenioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
