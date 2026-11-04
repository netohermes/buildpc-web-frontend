import { TestBed } from '@angular/core/testing';

import { ProdutoProntoService } from './produto-pronto-service';

describe('ProdutoProntoService', () => {
  let service: ProdutoProntoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoProntoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
