import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

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
        private authService: AuthService,
        private tokenService: TokenService,
        private spinner: SpinnerService,
        private toastService: ToastService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        if (this.authService.validateUsuario() && this.tokenService.validateToken()) {
            this.router.navigateByUrl('/sistema');
        }
    }

    onSubmit(): void {
        this.spinner.show();
        this.authService.login(this.loginForm.value)
            .subscribe(
                (response) => {
                    this.spinner.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                    } else {
                        this.router.navigateByUrl('/sistema');
                    }
                }
            );
    }

}
