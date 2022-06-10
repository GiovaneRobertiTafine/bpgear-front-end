import { TestBed } from '@angular/core/testing';

import { EmpresaGuardService } from './empresa-guard.service';

describe('EmpresaGuardService', () => {
  let service: EmpresaGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
