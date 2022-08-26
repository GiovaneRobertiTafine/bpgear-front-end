import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormControlValidator, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { ClienteCriar } from '../../models/requests/cliente-criar.request';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-cliente-criar',
    templateUrl: './cliente-criar.page.html',
    styleUrls: ['./cliente-criar.page.scss']
})
export class ClienteCriarPage implements OnInit {
    private helper = new JwtHelperService();
    form: NgTypeFormGroup<ClienteCriar>;
    nomeEmpresa = '';
    cnpj = '';
    token = '';
    cliente: Cliente;

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
            nomeCliente: [nome],
            email: [email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            usuario: ["", [Validators.required]],
            senha: ["", [Validators.required, Validators.minLength(10)]],
            confirmarSenha: ["",
                [Validators.required, (c: NgTypeFormControlValidator<string, { senha: string; }>) => {
                    if (c && c.parent && c.parent.value.senha === c.value) {
                        return null;
                    }
                    return { notMatch: true };
                }]
            ],
            cnpj: ["", Validators.required],
            razaoSocial: ["", Validators.required],
            responsavel: ["", Validators.required],
            telefone: ["", Validators.required],
            idMercado: [idMercado],
            pesquisaAtiva: [false],
        });

        this.form = this.fb.group<ClienteCriar>({
            idEmpresa: [this.helper.decodeToken(this.token).idEmpresa],
            cliente: cliente
        });
    }

}
