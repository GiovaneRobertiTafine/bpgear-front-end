import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from 'src/app/shared/models/data-return.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { Cliente } from '../models/interfaces/cliente.interface';
import { ClienteCriarEnviarEmail } from '../models/requests/cliente-criar-enviar-email.request';

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterClientes(idEmpresa): Observable<IDataReturn<Cliente[]>> {
        return this.get<IDataReturn<Cliente[]>>('cliente/' + idEmpresa)
            .pipe(
                catchError(this.handleError<IDataReturn<Cliente[]>>('obterClientes'))
            );
    }

    public clienteCriarEnviarEmail(request: ClienteCriarEnviarEmail): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('cliente/criar-email', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('clienteCriarEnviarEmail'))
            );
    }
}
