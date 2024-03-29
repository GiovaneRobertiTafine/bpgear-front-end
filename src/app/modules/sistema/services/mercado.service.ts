import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { Ordenacao } from '../../shared/models/ordenacao.model';
import { Paginacao } from '../../shared/models/paginacao.model';
import { ApiService } from '../../shared/services/api.service';
import { Mercado } from '../models/interfaces/mercado.interface';
import { MercadoCriar } from '../models/requests/mercado-criar.request';
import { MercadoDeletar } from '../models/requests/mercado-deletar.request';
import { MercadoEditar } from '../models/requests/mercado-editar.request';

@Injectable({
    providedIn: 'root'
})
export class MercadoService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterMercados(idEmpresa: string, paginacao?: Paginacao, ordenacao?: Ordenacao | null): Observable<IDataReturn<Mercado[]>> {
        return this.get<IDataReturn<Mercado[]>, Paginacao>('mercado/' + idEmpresa, { ...paginacao, ...ordenacao })
            .pipe(
                catchError(this.handleError<IDataReturn<Mercado[]>>('obterMercado'))
            );
    }

    public criarMercado(request: MercadoCriar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('mercado/criar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('mercadoCriar'))
            );
    }

    public deletarMercado(request: MercadoDeletar): Observable<IDataReturn<null>> {
        return this.delete<IDataReturn<null>>('mercado/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('mercadoDeletar'))
            );
    }

    public editarMercado(request: MercadoEditar): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('mercado/editar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('mercadoEditar'))
            );
    }
}
