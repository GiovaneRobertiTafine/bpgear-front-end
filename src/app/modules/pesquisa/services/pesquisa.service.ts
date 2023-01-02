import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { ApiService } from '../../shared/services/api.service';
import { PesquisaM1Relatorio } from '../models/interfaces/pesquisa-m1-relatorio.dto';
import { PesquisaM1 } from '../models/interfaces/pesquisa-m1.dto';
import { PesquisaM2Relatorio } from '../models/interfaces/pesquisa-m2-relatorio.dto';
import { PesquisaM2 } from '../models/interfaces/pesquisa-m2.dto';
import { PesquisaM3Relatorio } from '../models/interfaces/pesquisa-m3-relatorio.dto';
import { PesquisaM3 } from '../models/interfaces/pesquisa-m3.dto';
import { PesquisaM1Inserir } from '../models/requests/pesquisa-m1-inserir.request';
import { PesquisaM1Obter } from '../models/requests/pesquisa-m1-obter.request';
import { PesquisaM2Inserir } from '../models/requests/pesquisa-m2-inserir.request';
import { PesquisaM2Obter } from '../models/requests/pesquisa-m2-obter.request';
import { PesquisaM3Inserir } from '../models/requests/pesquisa-m3-inserir.request';
import { PesquisaM3Obter } from '../models/requests/pesquisa-m3-obter.request';

@Injectable({
    providedIn: 'root'
})
export class PesquisaService extends ApiService {

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

    public obterRelatorioM1(idEmpresa: string): Observable<IDataReturn<PesquisaM1Relatorio[]>> {
        return this.get<IDataReturn<PesquisaM1Relatorio[]>, string>('pesquisa/m1-relatorio/' + idEmpresa)
            .pipe(
                catchError(this.handleError<IDataReturn<PesquisaM1Relatorio[]>>('obterRelatorioM1'))
            );
    }

    public obterDadosM2(params: PesquisaM2Obter): Observable<IDataReturn<PesquisaM2>> {
        return this.get<IDataReturn<PesquisaM2>, PesquisaM2Obter>('pesquisa/m2', params)
            .pipe(
                catchError(this.handleError<IDataReturn<PesquisaM2>>('obterDadosM2'))
            );
    }

    public inserirDadosM2(request: PesquisaM2Inserir): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('pesquisa/m2-inserir', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('inserirDadosM2'))
            );
    }

    public obterRelatorioM2(idEmpresa: string): Observable<IDataReturn<PesquisaM2Relatorio[]>> {
        return this.get<IDataReturn<PesquisaM2Relatorio[]>, string>('pesquisa/m2-relatorio/' + idEmpresa)
            .pipe(
                catchError(this.handleError<IDataReturn<PesquisaM2Relatorio[]>>('obterRelatorioM2'))
            );
    }

    public obterDadosM3(params: PesquisaM3Obter): Observable<IDataReturn<PesquisaM3>> {
        return this.get<IDataReturn<PesquisaM3>, PesquisaM3Obter>('pesquisa/m3', params)
            .pipe(
                catchError(this.handleError<IDataReturn<PesquisaM3>>('obterDadosM2'))
            );
    }

    public inserirDadosM3(request: PesquisaM3Inserir): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('pesquisa/m3-inserir', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('inserirDadosM2'))
            );
    }

    public obterRelatorioM3(idEmpresa: string): Observable<IDataReturn<PesquisaM3Relatorio[]>> {
        return this.get<IDataReturn<PesquisaM3Relatorio[]>, string>('pesquisa/m3-relatorio/' + idEmpresa)
            .pipe(
                catchError(this.handleError<IDataReturn<PesquisaM3Relatorio[]>>('obterRelatorioM3'))
            );
    }
}
