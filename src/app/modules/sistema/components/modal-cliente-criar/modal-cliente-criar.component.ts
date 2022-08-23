import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MercadoDataInputDropdown } from '../../models/constants/sistema-data-input-dropdown-config.constant';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { ClienteCriarEnviarEmail } from '../../models/requests/cliente-criar-enviar-email.request';
import { ColaboradorService } from '../../services/colaborador.service';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-modal-cliente-criar',
    templateUrl: './modal-cliente-criar.component.html',
    styleUrls: ['./modal-cliente-criar.component.scss']
})
export class ModalClienteCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ClienteCriarEnviarEmail>;
    mercados: Mercado[];
    idEmpresa: string = '';
    mercadoDataInputDropdown = MercadoDataInputDropdown;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private colaboradorService: ColaboradorService,
        private mercadoService: MercadoService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
        this.idEmpresa = this.empresaService.getEmpresa().value.id;

        this.form = this.fb.group<ClienteCriarEnviarEmail>({
            idEmpresa: [this.idEmpresa],
            nomeCliente: ["", [Validators.required, Validators.minLength(10)]],
            email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            idMercado: ["", [Validators.required]]
        });
        this.form.setFormErrors({
            idEmpresa: {},
            nomeCliente: { required: "Nome é requerido", minlength: "Minímo de 10 caracteres" },
            email: { required: "E-mail é requirido.", pattern: "E-mail inválido" },
            idMercado: { required: "Mercado é requirido." }
        });
    }

    criarCliente(): void {
        console.log(this.form.value);
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
    }

    get formGroup() { return this.form as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
