import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormTypeBuilder, NgTypeFormControlValidator, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { CpfCnpjValidator } from 'src/app/modules/shared/utils/cpf-cnpj.validator';
import { Pesquisa } from '../../models/enums/pesquisa.enum';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { ClienteCriar } from '../../models/requests/cliente-criar.request';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'bpgear-cliente-criar',
    templateUrl: './cliente-criar.page.html',
    styleUrls: ['./cliente-criar.page.scss']
})
export class ClienteCriarPage implements OnInit, OnDestroy {
    private helper = new JwtHelperService();
    form: NgTypeFormGroup<ClienteCriar>;
    nomeEmpresa = '';
    cnpj = '';
    token = '';
    clienteCriado: boolean = false;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private clienteService: ClienteService,
        private route: ActivatedRoute,
        private fb: FormTypeBuilder,
    ) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('access_token');
        this.nomeEmpresa = this.helper.decodeToken(this.token).nomeEmpresa;
        this.cnpj = this.helper.decodeToken(this.token).cnpjEmpresa;

        const nome = this.helper.decodeToken(this.token).nomeCliente;
        const email = this.helper.decodeToken(this.token).email;
        const idMercado = this.helper.decodeToken(this.token).idMercado;

        this.form = this.fb.group<ClienteCriar>({
            idEmpresa: [this.helper.decodeToken(this.token).idEmpresa],
            nome: [nome, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            email: [email, [Validators.required, Validators.maxLength(70), Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            // usuario: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern(/^([a-zA-Z0-9]*)$/)]],
            // senha: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70), Validators.pattern(/^([a-zA-Z0-9!@#$%&*.]*)$/)]],
            // confirmarSenha: ["",
            //     [Validators.required, (c: NgTypeFormControlValidator<string, { senha: string; }>) => {
            //         if (c && c.parent && c.parent.value.senha === c.value) {
            //             return null;
            //         }
            //         return { notMatch: true };
            //     }]
            // ],
            // cnpj: ["", [Validators.required, CpfCnpjValidator]],
            razaoSocial: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
            responsavel: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            telefone: ["", [Validators.required, Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)]],
            idMercado: [idMercado],
            pesquisa: [Pesquisa.DESATIVADA],
        });

        this.form.setFormErrors({
            nome: { required: "Nome é requerido.", minlength: "Mínimo de 3 caracteres.", maxlength: "Máximo de 70 caracteres." },
            email: { required: "E-mail é requerido.", pettern: "E-mail inválido.", maxlength: "Máximo de 70 caracteres." },
            // usuario: { required: "Usuário é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 50 caracteres.", pattern: "Somente números, letras minúsculas e maiúsculas." },
            // senha: { required: "Senha é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres.", pattern: "Somente números, letras minúsculas, letra maiúsculas e os seguintes códigos: .!@#$%&* ." },
            // confirmarSenha: { required: "Confirmar senha é requerido.", notMatch: "Senha diferente." },
            // cnpj: { required: "CNPJ é requerido.", mask: "CNPJ inválido.", invalidCpfCnpj: "CNPJ inválido." },
            razaoSocial: { required: "Razão Social é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 70 caracteres." },
            responsavel: { required: "Responsável é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres." },
            telefone: { required: "Telefone é requerido.", mask: "Telefone inválido", pattern: "Telefone inválido" },
            idMercado: {},
            pesquisa: {},
            idEmpresa: {}
        });
    }

    criarCliente(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: ClienteCriar = { ...this.form.value };
        this.spinnerService.show();
        this.clienteService.criarCliente(request)
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
                    this.clienteCriado = true;
                }
            );
    }

    get formGroup() { return this.form as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
