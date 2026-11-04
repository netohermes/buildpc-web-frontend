import { TestBed } from '@angular/core/testing';

import { MontagemService } from './montagem-service';

describe('MontagemService', () => {
  let service: MontagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
