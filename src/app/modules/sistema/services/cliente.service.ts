import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { Ordenacao } from '../../shared/models/ordenacao.model';
import { Paginacao } from '../../shared/models/paginacao.model';
import { ApiService } from '../../shared/services/api.service';
import { Cliente } from '../models/interfaces/cliente.interface';
import { ClienteAlterarPesquisa } from '../models/requests/cliente-alterar-pesquisa.request';
import { ClienteCriarEmail } from '../models/requests/cliente-criar-enviar-email.request';
import { ClienteCriar } from '../models/requests/cliente-criar.request';
import { ClienteDeletar } from '../models/requests/cliente-deletar.request';
import { ClienteEditar } from '../models/requests/cliente-editar.request';

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterClientes(idEmpresa: string, paginacao?: Paginacao, ordenacao?: Ordenacao | null): Observable<IDataReturn<Cliente[]>> {
        return this.get<IDataReturn<Cliente[]>, Paginacao>('cliente/' + idEmpresa, { ...paginacao, ...ordenacao })
            .pipe(
                catchError(this.handleError<IDataReturn<Cliente[]>>('obterClientes'))
            );
    }

    public clienteCriarEnviarEmail(request: ClienteCriarEmail): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('cliente/criar-email', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('clienteCriarEnviarEmail'))
            );
    }

    public criarCliente(request: ClienteCriar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('cliente/criar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('clienteCriar'))
            );
    }

    public deletarCliente(request: ClienteDeletar): Observable<IDataReturn<null>> {
        return this.delete<IDataReturn<null>>('cliente/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('clienteDeletar'))
            );
    }

    public alterarPesquisaCliente(request: ClienteAlterarPesquisa): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('cliente/alterar-pesquisa', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('clienteAlterarPesquisa'))
            );
    }

    public editarCliente(request: ClienteEditar): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('cliente/editar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('editarCliente'))
            );
    }
}
