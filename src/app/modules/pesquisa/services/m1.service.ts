import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { ApiService } from '../../shared/services/api.service';
import { PesquisaM1 } from '../models/interfaces/pesquisa-m1.dto';
import { PesquisaM1Inserir } from '../models/requests/pesquisa-m1-inserir.request';
import { PesquisaM1Obter } from '../models/requests/pesquisa-m1-obter.request';

@Injectable({
    providedIn: 'root'
})
export class M1Service extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterDadosM1(params: PesquisaM1Obter): Observable<IDataReturn<PesquisaM1>> {
        return this.get<IDataReturn<PesquisaM1>, PesquisaM1Obter>('pesquisa/m1', params)
            .pipe(
                catchError(this.handleError<IDataReturn<PesquisaM1>>('obterDadosM1'))
            );
    }

    public inserirDadosM1(request: PesquisaM1Inserir): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('pesquisa/m1-inserir', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('inserirDadosM1'))
            );
    }

}
