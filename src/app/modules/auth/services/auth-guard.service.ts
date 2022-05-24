import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { TokenService } from 'src/app/modules/auth/services/token.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private authService: AuthService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        const resValidateUsuario = this.authService.validateUsuario();
        return of(resValidateUsuario).pipe(tap((res) => {
            if (!res) {
                this.router.navigateByUrl('/login');
            }
        }));

    }
}
