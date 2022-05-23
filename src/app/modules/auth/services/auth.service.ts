import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    constructor(httpClient: HttpClient, private tokenService: TokenService) {
        super(httpClient);
    }

    public login(usuario: UsuarioAutenticar): Observable<IDataReturn<Usuario>> {
        return this.post<IDataReturn<Usuario>>('autenticar', usuario)
            .pipe(
                tap((res: any) => {
                    console.log(res);
                    this.tokenService.setToken(res.data.token);
                    this.usuario$.next(res.data);
                }),
                catchError(this.handleError<IDataReturn<Usuario>>('autenticar'))
            );
    };

    public logout(): void {
        this.tokenService.removeToken();
        this.usuario$.next(null);
    }

    getUsuario(): Observable<Usuario> {
        return this.usuario$;
    }

}
