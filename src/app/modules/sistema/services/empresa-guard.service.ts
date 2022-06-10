import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { EmpresaService } from './empresa.service';

@Injectable({
    providedIn: 'root'
})
export class EmpresaGuardService implements CanActivate {

    constructor(
        private router: Router,
        private empresaService: EmpresaService,
        private route: ActivatedRoute
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const resValidateEmpresa = this.empresaService.validateEmpresa();
        return of(resValidateEmpresa).pipe(tap((res) => {
            if (!res) {
                this.router.navigate(['sistema/empresa'], { relativeTo: this.route });
            } else {
                if (this.empresaService.getEmpresa().value.id !== route.paramMap.get('id')) {
                    this.router.navigate(['sistema/colaborador', this.empresaService.getEmpresa().value.id], { relativeTo: this.route });
                }
            }
        }));
    }
}
