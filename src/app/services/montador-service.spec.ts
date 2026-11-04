import { TestBed } from '@angular/core/testing';

import { MontadorService } from './montador-service';

describe('MontadorService', () => {
  let service: MontadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
