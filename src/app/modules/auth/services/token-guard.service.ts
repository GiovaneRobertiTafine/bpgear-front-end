import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class TokenGuardService implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private authService: AuthService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        const resValidateToken = this.tokenService.validateToken();
        return of(resValidateToken).pipe(tap((res) => {
            if (!res) {
                this.router.navigateByUrl('/login');
            }
        }));

    }
}
