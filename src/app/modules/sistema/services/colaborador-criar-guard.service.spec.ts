import { TestBed } from '@angular/core/testing';

import { ColaboradorCriarGuardService } from './colaborador-criar-guard.service';

describe('ColaboradorCriarGuardService', () => {
    let service: ColaboradorCriarGuardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ColaboradorCriarGuardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
