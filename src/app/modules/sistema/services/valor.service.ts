import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { ApiService } from '../../shared/services/api.service';
import { Valor } from '../models/interfaces/valor.inteface';
import { ValorCriar } from '../models/requests/valor-criar.request';
import { ValorDeletar } from '../models/requests/valor-deletar.request';
import { ValorEditar } from '../models/requests/valor-editar.request';

@Injectable({
    providedIn: 'root'
})
export class ValorService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterValores(idEmpresa): Observable<IDataReturn<Valor[]>> {
        return this.get<IDataReturn<Valor[]>>('valor/' + idEmpresa)
            .pipe(
                catchError(this.handleError<IDataReturn<Valor[]>>('obterValores'))
            );
    }

    public criarValor(request: ValorCriar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('valor/criar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('criarValor'))
            );
    }

    public deletarValor(request: ValorDeletar): Observable<IDataReturn<null>> {
        return this.delete<IDataReturn<null>>('valor/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('deletarValor'))
            );
    }

    public editarValor(request: ValorEditar): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('valor/editar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('editarValor'))
            );
    }
}
