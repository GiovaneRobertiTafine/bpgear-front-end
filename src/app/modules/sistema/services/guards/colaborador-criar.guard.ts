import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ColaboradorCriarGuard implements CanActivate {
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
