import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class TokenGuardService implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private authService: AuthService
    ) { }

    canActivate(
        route?: ActivatedRouteSnapshot,
        state?: RouterStateSnapshot
    ): Observable<boolean> {
        const resValidateToken = this.tokenService.validateToken();
        return of(resValidateToken).pipe(tap((res) => {
            if (!res) {
                this.router.navigateByUrl('/login');
            }
        }));

    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate();
    }
}
