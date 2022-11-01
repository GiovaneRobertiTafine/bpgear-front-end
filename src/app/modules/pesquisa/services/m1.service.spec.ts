import { TestBed } from '@angular/core/testing';

import { M1Service } from './m1.service';

describe('M1Service', () => {
  let service: M1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(M1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
