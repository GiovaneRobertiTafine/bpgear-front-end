import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from 'src/app/shared/models/data-return.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { Colaborador } from '../models/interfaces/colaborador.interface';
import { ColaboradorAlterarPesquisa } from '../models/requests/colaborador-alterar-pesquisa.request';
import { ColaboradorCriarEmail } from '../models/requests/colaborador-criar-email.request';
import { ColaboradorCriar } from '../models/requests/colaborador-criar.request';
import { DeletarColaborador } from '../models/requests/colaborador-deletar.request';

@Injectable({
    providedIn: 'root'
})
export class ColaboradorService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterColaboradores(idEmpresa: string): Observable<IDataReturn<Colaborador[]>> {
        return this.get<IDataReturn<Colaborador[]>>('colaborador/' + idEmpresa)
            .pipe(
                catchError(this.handleError<IDataReturn<Colaborador[]>>('obterColaborador'))
            );
    }

    public colaboradorCriarEnviarEmail(request: ColaboradorCriarEmail): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('colaborador/criar-email', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('colaboradorCriarEnviarEmail'))
            );
    }

    public criarColaborador(request: ColaboradorCriar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('colaborador/criar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('colaboradorCriar'))
            );
    }

    public deletarColaborador(request: DeletarColaborador): Observable<IDataReturn<null>> {
        return this.delete<IDataReturn<null>>('colaborador/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('colaboradorDeletar'))
            );
    }

    public alterarPesquisaColaborador(request: ColaboradorAlterarPesquisa): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('colaborador/alterar-pesquisa', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('colaboradorAlterarPesquisa'))
            );
    }
}
