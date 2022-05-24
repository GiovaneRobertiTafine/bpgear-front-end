import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { IDataReturn } from 'src/app/shared/models/data-return.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { UsuarioAutenticar } from '../models/request/usuario-autenticar.request';
import { Usuario } from '../models/usuario.model';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {
    private usuario$: BehaviorSubject<Usuario> = new BehaviorSubject(null);

    constructor(httpClient: HttpClient, private tokenService: TokenService, private router: Router) {
        super(httpClient);
    }

    public login(usuario: UsuarioAutenticar): Observable<IDataReturn<Usuario>> {
        return this.post<IDataReturn<Usuario>>('autenticar', usuario)
            .pipe(
                tap((res: any) => {
                    this.tokenService.setToken(res.data.token);
                    this.setUsuario(res.data);
                }),
                catchError(this.handleError<IDataReturn<Usuario>>('autenticar'))
            );
    };

    public logout(): void {
        this.tokenService.removeToken();
        this.removeUsuario();
        this.router.navigateByUrl('/login');
    }

    getUsuario(): Observable<Usuario> {
        return this.usuario$;
    }

    setUsuario(usuario: Usuario): void {
        this.usuario$.next(usuario);
        localStorage.setItem('bpgear-usuario', JSON.stringify(usuario));
    }

    removeUsuario(): void {
        this.usuario$.next(null);
        localStorage.removeItem('bpgear-usuario');
    }

    validateUsuario(): boolean {
        const usuario = localStorage.getItem('bpgear-usuario');

        if (usuario) {
            !this.usuario$.value ? this.setUsuario(JSON.parse(usuario)) : null;
            return true;
        } else {
            return false;
        }
    }

}
