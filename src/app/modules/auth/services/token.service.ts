import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() { }

    getToken(): string {
        return localStorage.getItem('token');
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    removeToken(): void {
        localStorage.removeItem('token');
    }
}
