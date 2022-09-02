import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaskService } from 'ngx-mask';
import { FormTypeBuilder, NgTypeFormControlValidator, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { CpfCnpjValidator } from 'src/app/shared/utils/cpf-cnpj.validator';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { ClienteCriar } from '../../models/requests/cliente-criar.request';
import { MercadoService } from '../../services/mercado.service';

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
    cliente: Cliente;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private mercadoService: MercadoService,
        private modalService: NgbModal,
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

        const cliente = this.fb.group<Cliente & { senha: string; confirmarSenha: string; }>({
            nomeCliente: [nome, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
            email: [email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            usuario: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            senha: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            confirmarSenha: ["",
                [Validators.required, (c: NgTypeFormControlValidator<string, { senha: string; }>) => {
                    if (c && c.parent && c.parent.value.senha === c.value) {
                        return null;
                    }
                    return { notMatch: true };
                }]
            ],
            cnpj: ["", [Validators.required, CpfCnpjValidator]],
            razaoSocial: ["", [Validators.required, Validators.maxLength(70)]],
            responsavel: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            telefone: ["", [Validators.required, Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)]],
            idMercado: [idMercado],
            pesquisaAtiva: [false],
        });

        this.form = this.fb.group<ClienteCriar>({
            idEmpresa: [this.helper.decodeToken(this.token).idEmpresa],
            cliente: cliente
        });

        cliente.setFormErrors({
            nomeCliente: { required: "Nome é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres." },
            email: { required: "E-mail é requerido.", pettern: "E-mail inválido." },
            usuario: { required: "Usuário é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 50 caracteres." },
            senha: { required: "Senha é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 50 caracteres." },
            confirmarSenha: { required: "Confirmar Senha é requerido.", notMatch: "Senha diferente." },
            cnpj: { required: "CNPJ é requerido.", mask: "CNPJ inválido.", invalidCpfCnpj: "CNPJ inválido." },
            razaoSocial: { required: "Razão Social é requerido.", maxlength: "Máximo de 70 caracteres." },
            responsavel: { required: "Responsável é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres." },
            telefone: { required: "Telefone é requerido.", pattern: "Telefone inválido" },
            idMercado: {},
            pesquisaAtiva: {},
        });
    }

    get formGroup() { return this.form as FormGroup; }
    get formGroupCliente() { return this.form.controls.cliente as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
