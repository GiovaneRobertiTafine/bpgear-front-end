import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { TokenService } from 'src/app/modules/auth/services/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService
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
