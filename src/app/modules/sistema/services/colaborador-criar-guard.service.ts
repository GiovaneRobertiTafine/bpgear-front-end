import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class ColaboradorCriarGuardService implements CanActivate {
    private helper = new JwtHelperService();

    constructor(
        private router: Router,
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
