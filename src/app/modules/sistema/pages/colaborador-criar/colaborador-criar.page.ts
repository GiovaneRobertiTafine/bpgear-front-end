import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormTypeBuilder, NgTypeFormControlValidator, NgTypeFormGroup } from 'reactive-forms-typed';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { ColaboradorCriar } from '../../models/requests/colaborador-criar.request';
import { ColaboradorService } from '../../services/colaborador.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { Pesquisa } from '../../models/enums/pesquisa.enum';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';

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
    colaboradorCriado: boolean = false;

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

        const nome = this.helper.decodeToken(this.token).nome;
        const email = this.helper.decodeToken(this.token).email;

        this.form = this.fb.group<ColaboradorCriar>({
            idEmpresa: [this.helper.decodeToken(this.token).id],
            nome: [nome, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            email: [email, [Validators.required, Validators.maxLength(70), Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            usuario: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^([a-zA-Z0-9]*)$/)]],
            senha: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z0-9!@#$%&*.]*)$/)]],
            confirmarSenha: ["",
                [Validators.required, (c: NgTypeFormControlValidator<string, Colaborador>) => {
                    if (c && c.parent && c.parent.value.senha === c.value) {
                        return null;
                    }
                    return { notMatch: true };
                }]
            ],
            pesquisa: [Pesquisa.DESATIVADA]
        });

        this.form.setFormErrors({
            idEmpresa: {},
            nome: { required: "Nome é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres." },
            email: { required: "E-mail é requerido.", pattern: "E-mail inválido.", maxlength: "Máximo de 70 caracteres." },
            usuario: { required: "Usuário é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 50 caracteres.", pattern: "Somente números, letras minúsculas e maiúsculas." },
            senha: { required: "Senha é requerida.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres.", pattern: "Somente números, letras minúsculas, letra maiúsculas e os seguintes códigos: .!@#$%&* ." },
            confirmarSenha: { required: "Confirmar senha é requerido.", notMatch: "Senha diferente." },
            pesquisa: {}
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
                }
            );

    }

    get formGroup() { return this.form as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
