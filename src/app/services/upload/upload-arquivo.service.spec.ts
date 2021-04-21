import { TestBed } from '@angular/core/testing';

import { UploadArquivoService } from './upload-arquivo.service';

describe('UploadArquivoService', () => {
  let service: UploadArquivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadArquivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
