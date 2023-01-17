import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { Ordenacao } from '../../shared/models/ordenacao.model';
import { Paginacao } from '../../shared/models/paginacao.model';
import { ApiService } from '../../shared/services/api.service';
import { Setor } from '../models/interfaces/setor.interface';
import { SetorCriar } from '../models/requests/setor-criar.request';
import { SetorDeletar } from '../models/requests/setor-deletar.request';
import { SetorEditar } from '../models/requests/setor-editar.request';

@Injectable({
    providedIn: 'root'
})
export class SetorService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterSetores(idEmpresa: string, paginacao?: Paginacao, ordenacao?: Ordenacao | null): Observable<IDataReturn<Setor[]>> {
        return this.get<IDataReturn<Setor[]>, Paginacao>('setor/' + idEmpresa, { ...paginacao, ...ordenacao })
            .pipe(
                catchError(this.handleError<IDataReturn<Setor[]>>('obterSetores'))
            );
    }

    public criarSetor(request: SetorCriar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('setor/criar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('criarSetor'))
            );
    }

    public deletarSetor(request: SetorDeletar): Observable<IDataReturn<null>> {
        return this.delete<IDataReturn<null>>('setor/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('deletarSetor'))
            );
    }

    public editarSetor(request: SetorEditar): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('setor/editar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('editarSetor'))
            );
    }
}
