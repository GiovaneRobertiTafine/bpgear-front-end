import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { IDataReturn } from '../models/data-return.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    protected readonly url = environment.api.url;
    private defaultHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private httpClient: HttpClient) { }

    protected post<T>(path: string, body?: any): Observable<T> {
        return this.httpClient.post<T>(
            `${this.url}/${path}`,
            body,
            { headers: this.defaultHeaders }
        ) as Observable<T>;
    }

    protected get<T>(path: string): Observable<T> {
        return this.httpClient.get<T>(
            `${this.url}/${path}`
        ) as Observable<T>;
    }

    protected delete<T>(path: string, p?: {}): Observable<T> {
        return this.httpClient.delete<T>(
            `${this.url}/${path}`,
            { params: p }
        ) as Observable<T>;
    }

    protected put<T>(path: string, payload?: {}): Observable<T> {
        return this.httpClient.put<T>(
            `${this.url}/${path}`,
            payload
        ) as Observable<T>;
    }

    handleError<T>(errorMethod: string) {
        return (error: HttpErrorResponse): Observable<T> => {
            let errorMessage = '';
            console.log(error);

            // client-side error or service off
            if (error.status === 0) {
                errorMessage = `Error Method: ${errorMethod} => Message: ${error.message}`;
                console.log(errorMessage);
                const resError: IDataReturn<null> = { data: null, resultStatus: { code: error.status, message: "Serviço indisponível no momento." } };
                return of(resError as unknown as T);
            }

            if (!error.error?.resultStatus?.code) {
                errorMessage = `Error Method: ${errorMethod} => Code: ${error.status}, Message: ${error.message}`;
                console.log(errorMessage);

                if (error.status === 400) {
                    const resError: IDataReturn<null> = { data: null, resultStatus: { code: error.status, message: "Erro na requisição." } };
                    return of(resError as unknown as T);
                }

                if (error.status === 405) {
                    const resError: IDataReturn<null> = { data: null, resultStatus: { code: error.status, message: "Erro no método da requisição." } };
                    return of(resError as unknown as T);
                }

                const resError: IDataReturn<null> = { data: null, resultStatus: { code: error.status, message: "Erro interno." } };
                return of(resError as unknown as T);
            }

            // if (error.error instanceof ErrorEvent) {
            // client-side error
            //     errorMessage = `Error Method: ${errorMethod} => Message: ${error.error.message}`;
            // } else {
            // server-side error
            errorMessage = `Error Method: ${errorMethod} => Code: ${error.status}, Message: ${error.message}`;
            // }
            console.log(errorMessage);
            return of(error.error);
        };
    }


}
