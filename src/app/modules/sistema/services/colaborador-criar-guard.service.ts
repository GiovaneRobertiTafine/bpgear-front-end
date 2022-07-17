import { AfterViewInit, Injectable, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, tap } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class ColaboradorCriarGuardService implements CanActivate {
    private helper = new JwtHelperService();

    constructor(
        private router: Router,
        private empresaService: EmpresaService,
        private route: ActivatedRoute
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const token = route.queryParams["access_token"];
        if (this.helper.isTokenExpired(token)) {
            this.router.navigate(['/']);
            return of(false);
        } else {
            return of(true);
        }
    }
}
