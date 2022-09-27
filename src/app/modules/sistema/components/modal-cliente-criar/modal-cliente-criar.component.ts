import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormControlValidator, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { CpfCnpjValidator } from 'src/app/modules/shared/utils/cpf-cnpj.validator';
import { MercadoDataInputDropdown } from '../../models/constants/sistema-data-input-dropdown-config.constant';
import { Pesquisa } from '../../models/enums/pesquisa.enum';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { ClienteCriar } from '../../models/requests/cliente-criar.request';
import { ClienteService } from '../../services/cliente.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-cliente-criar',
    templateUrl: './modal-cliente-criar.component.html',
    styleUrls: ['./modal-cliente-criar.component.scss']
})
export class ModalClienteCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ClienteCriar>;
    mercados: Mercado[];
    idEmpresa: string = '';
    mercadoDataInputDropdown = MercadoDataInputDropdown;
    pesquisa = Pesquisa;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private clienteService: ClienteService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
        this.idEmpresa = this.empresaService.getEmpresa().value.id;

        this.form = this.fb.group<ClienteCriar>({
            idEmpresa: [this.idEmpresa],
            nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            email: ["", [Validators.required, Validators.maxLength(70), Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            cnpj: ["", [Validators.required, CpfCnpjValidator]],
            razaoSocial: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
            responsavel: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            telefone: ["", [Validators.required, Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)]],
            idMercado: ["", [Validators.required]],
            pesquisa: [Pesquisa.DESATIVADA],
        });

        this.form.setFormErrors({
            nome: { required: "Nome é requerido.", minlength: "Mínimo de 3 caracteres.", maxlength: "Máximo de 70 caracteres." },
            email: { required: "E-mail é requerido.", pettern: "E-mail inválido.", maxlength: "Máximo de 70 caracteres." },
            cnpj: { required: "CNPJ é requerido.", mask: "CNPJ inválido.", invalidCpfCnpj: "CNPJ inválido." },
            razaoSocial: { required: "Razão Social é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 70 caracteres." },
            responsavel: { required: "Responsável é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres." },
            telefone: { required: "Telefone é requerido.", mask: "Telefone inválido", pattern: "Telefone inválido" },
            idMercado: { required: "Mercado é requirido.", maxlength: "Máximo de 70 caracteres.", notMatchValue: "Entrada inválida." },
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
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code === 409)
                        return this.toastService.warning(response.resultStatus.message);
                    if (response.resultStatus.code !== 200) {
                        return this.toastService.error(response.resultStatus.message);
                    }

                    this.toastService.success(response.resultStatus.message);
                    this.activeModal.close(true);
                }
            );
    }

    get formGroup() { return this.form as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }

}
