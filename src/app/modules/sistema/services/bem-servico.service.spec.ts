import { TestBed } from '@angular/core/testing';

import { BemServicoService } from './bem-servico.service';

describe('BemServicoService', () => {
  let service: BemServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BemServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
