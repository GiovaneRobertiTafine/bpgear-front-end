import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from 'src/app/shared/models/data-return.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { UsuarioAutenticar } from '../models/request/usuario-autenticar.request';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public autenticarUsuario(usuario: UsuarioAutenticar): Observable<IDataReturn<Usuario>> {
        return this.post<IDataReturn<Usuario>>('api/Auth/autenticar', usuario)
            .pipe(catchError(this.handleError));
    };

}
