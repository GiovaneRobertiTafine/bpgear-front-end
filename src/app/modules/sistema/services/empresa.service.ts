import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { IDataReturn } from '../../shared/models/data-return.model';
import { ApiService } from '../../shared/services/api.service';
import { Empresa } from '../models/interfaces/empresa.interface';
import { EmpresaCriar } from '../models/requests/empresa-criar.request';
import { EmpresaDeletar } from '../models/requests/empresa-deletar.request';
import { EmpresaEditar } from '../models/requests/empresa-editar.request';

@Injectable({
    providedIn: 'root'
})
export class EmpresaService extends ApiService {
    private empresa$: BehaviorSubject<Empresa> = new BehaviorSubject(null);
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
        return this.delete<IDataReturn<null>>('empresa/deletar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('deletarEmpresa'))
            );
    }

    public editarEmpresa(request: EmpresaEditar): Observable<IDataReturn<null>> {
        return this.put<IDataReturn<null>>('empresa/editar', request)
            .pipe(
                catchError(this.handleError<IDataReturn<null>>('editarEmpresa'))
            );
    }

    setEmpresa(empresa: Empresa) {
        this.empresa$.next(empresa);
        localStorage.setItem('bpgear-empresa', JSON.stringify(empresa));
    }

    getEmpresa(): BehaviorSubject<Empresa> {
        return this.empresa$;
    }

    removeEmpresa(): void {
        this.empresa$.next(null);
        localStorage.removeItem('bpgear-empresa');
    }

    validateEmpresa(): boolean {
        const empresa = localStorage.getItem('bpgear-empresa');

        if (empresa) {
            !this.empresa$.value ? this.setEmpresa(JSON.parse(empresa)) : null;
            return true;
        } else {
            return false;
        }
    }

}
