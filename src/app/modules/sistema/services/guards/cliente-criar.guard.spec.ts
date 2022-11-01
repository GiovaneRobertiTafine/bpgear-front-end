import { TestBed } from '@angular/core/testing';

import { ClienteCriarGuard } from './cliente-criar.guard';

describe('ClienteCriarGuard', () => {
  let guard: ClienteCriarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClienteCriarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
