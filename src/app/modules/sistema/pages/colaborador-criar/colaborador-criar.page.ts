import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormTypeBuilder, NgTypeFormControlValidator, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { ColaboradorCriar } from '../../models/requests/colaborador-criar.request';
import { ColaboradorService } from '../../services/colaborador.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'bpgear-colaborador-criar',
    templateUrl: './colaborador-criar.page.html',
    styleUrls: ['./colaborador-criar.page.scss']
})
export class ColaboradorCriarPage implements OnInit, OnDestroy {
    private helper = new JwtHelperService();
    form: NgTypeFormGroup<ColaboradorCriar>;
    nomeEmpresa = '';
    cnpj = '';
    token = '';
    colaboradorCriado = false;
    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private route: ActivatedRoute,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private colaboradorService: ColaboradorService
    ) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('access_token');
        this.nomeEmpresa = this.helper.decodeToken(this.token).nomeEmpresa;
        this.cnpj = this.helper.decodeToken(this.token).cnpj;

        const nomeCompleto = this.helper.decodeToken(this.token).nomeCompleto;
        const email = this.helper.decodeToken(this.token).email;
        const colaborador = this.fb.group<ThisType<Colaborador & 'confimarSenha'>>({
            nomeCompleto: [nomeCompleto, [Validators.required]],
            email: [email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            usuario: ["", [Validators.required]],
            senha: ["", [Validators.required, Validators.minLength(10)]],
            confirmarSenha: ["",
                [Validators.required, (c: NgTypeFormControlValidator<string, Colaborador>) => {
                    if (c && c.parent && c.parent.value.senha === c.value) {
                        return null;
                    }
                    return { notMatch: true };
                }]
            ]
        });

        this.form = this.fb.group<ColaboradorCriar>({
            idEmpresa: [this.helper.decodeToken(this.token).id],
            colaborador: colaborador
        });

        colaborador.setFormErrors({
            nomeCompleto: { required: "Nome Completo é requerido." },
            email: { required: "E-mail é requerido.", pattern: "E-mail inválido." },
            usuario: { required: "Usuário é requerido." },
            senha: { required: "Senha é requerida.", minlength: "Mínimo de 10 caracteres." },
            confirmarSenha: { required: "Confirmar Senha é requerido.", notMatch: "Senha diferente." }
        });
    }

    criarColaborador(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: ColaboradorCriar = { ...this.form.value };
        this.spinnerService.show();
        this.colaboradorService.criarColaborador(request)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }
                    this.toastService.success(response.resultStatus.message);
                    this.colaboradorCriado = true;
                    localStorage.setItem('bpgear-token-colaborador-criar',
                        localStorage.getItem('bpgear-token-colaborador-criar') + this.token + ';');
                }
            );

    }

    get formGroup() { return this.form as FormGroup; }
    get formGroupColaborador() { return this.form.controls.colaborador as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
