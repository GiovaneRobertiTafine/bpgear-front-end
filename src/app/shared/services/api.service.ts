import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    protected readonly url = environment.api.auth.url;
    private defaultHeaders: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private httpClient: HttpClient) { }

    protected post<T>(route: string, body?: any): Observable<T> {
        return this.httpClient.post<T>(
            `${this.url}/${route}`,
            body,
            { headers: this.defaultHeaders }
        ) as Observable<T>;
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }


}
