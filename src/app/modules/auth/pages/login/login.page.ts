import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'bpgear-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    public loginForm = this.fb.group({
        usuario: ['', [Validators.required]],
        senha: ['', [Validators.required]],
    });

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.autenticarUsuario(this.loginForm.value)
            .subscribe(
                (response) => {
                    console.log(response);
                }
            );
    }

}
