import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private authService: AuthService
    ) { }

    canActivate(
        route?: ActivatedRouteSnapshot,
        state?: RouterStateSnapshot
    ): Observable<boolean> {
        const resValidateUsuario = this.authService.validateUsuario();
        return of(resValidateUsuario).pipe(tap((res) => {
            if (!res) {
                this.router.navigateByUrl('/login');
            }
        }));

    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate();
    }
}
