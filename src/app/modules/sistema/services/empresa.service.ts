import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from 'src/app/shared/models/data-return.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { Empresa } from '../models/interfaces/empresa.interface';
import { EmpresaCriar } from '../models/requests/empresa-criar.request';
import { EmpresaDeletar } from '../models/requests/empresa-deletar.request';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService extends ApiService {

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }

    public obterEmpresa(): Observable<IDataReturn<Empresa[]>> {
        return this.get<IDataReturn<Empresa[]>>('empresa')
            .pipe(
                catchError(this.handleError<IDataReturn<Empresa[]>>('obterEmpresa'))
            );
    }

    public criarEmpresa(request: EmpresaCriar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('empresa/criar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('criarEmpresa'))
            );
    }

    public deletarEmpresa(request: EmpresaDeletar): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('empresa/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('deletarEmpresa'))
            );
    }

    public editarEmpresa(request: Empresa): Observable<IDataReturn<null>> {
        return this.post<IDataReturn<null>>('empresa/editar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('editarEmpresa'))
            );
    }
}
