import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private helper = new JwtHelperService();
    constructor() { }

    getToken(): string {
        return localStorage.getItem('bpgear-token');
    }

    setToken(token: string): void {
        localStorage.setItem('bpgear-token', token);
    }

    removeToken(): void {
        localStorage.removeItem('bpgear-token');
    }

    validateToken(): boolean {
        const token = localStorage.getItem('token');

        if (token) {
            return !this.helper.isTokenExpired(token);
        } else {
            return false;
        }
    }
}
