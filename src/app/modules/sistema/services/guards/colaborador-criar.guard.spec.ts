import { TestBed } from '@angular/core/testing';

import { ColaboradorCriarGuard } from './colaborador-criar.guard';

describe('ColaboradorCriarGuard', () => {
  let guard: ColaboradorCriarGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ColaboradorCriarGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
