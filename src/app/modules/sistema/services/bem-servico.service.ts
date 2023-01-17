import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { Ordenacao } from '../../shared/models/ordenacao.model';
import { Paginacao } from '../../shared/models/paginacao.model';
import { ApiService } from '../../shared/services/api.service';
import { BemServico } from '../models/interfaces/bem-servico.interface';
import { BemServicoCriar } from '../models/requests/bem-servico-criar.request';
import { BemServicoDeletar } from '../models/requests/bem-servico-deletar.request';
import { BemServicoEditar } from '../models/requests/bem-servico-editar.request';

@Injectable({
    providedIn: 'root'
})
export class BemServicoService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterBensServicos(idEmpresa, paginacao?: Paginacao, ordenacao?: Ordenacao | null): Observable<IDataReturn<BemServico[]>> {
        return this.get<IDataReturn<BemServico[]>, Paginacao>('bem-servico/' + idEmpresa, { ...paginacao, ...ordenacao })
            .pipe(
                catchError(this.handleError<IDataReturn<BemServico[]>>('obterBensServicos'))
            );
    }

    public criarBemServico(request: BemServicoCriar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('bem-servico/criar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('criarBemServico'))
            );
    }

    public editarBemServico(request: BemServicoEditar): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('bem-servico/editar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('editarBemServico'))
            );
    }

    public deletarBemServico(request: BemServicoDeletar): Observable<IDataReturn<null>> {
        return this.delete<IDataReturn<null>>('bem-servico/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('deletarBemServico'))
            );
    }
}
