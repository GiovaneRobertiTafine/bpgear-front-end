import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IDataReturn } from 'src/app/shared/models/data-return.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { Empresa } from '../models/empresa.model';

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
}
