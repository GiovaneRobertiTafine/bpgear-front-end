import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { IDataReturn } from '../models/data-return.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    protected readonly url = environment.api.auth.url;
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

    handleError<T>(errorMethod: string) {
        return (error: HttpErrorResponse): Observable<T> => {
            let errorMessage = '';
            console.log(error);
            console.log(error.error instanceof ErrorEvent);

            // client-side error or service off
            if (error.status === 0) {
                errorMessage = `Error Method: ${errorMethod} => Message: ${error.message}`;
                console.log(errorMessage);
                const resError: IDataReturn<null> = { data: null, resultStatus: { code: 0, message: "Serviço indisponível no momento" } };
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
