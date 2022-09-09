import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MercadoDataInputDropdown } from '../../models/constants/sistema-data-input-dropdown-config.constant';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { ClienteCriarEmail } from '../../models/requests/cliente-criar-enviar-email.request';
import { ClienteService } from '../../services/cliente.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-cliente-criar-email',
    templateUrl: './modal-cliente-criar-email.component.html',
    styleUrls: ['./modal-cliente-criar-email.component.scss']
})
export class ModalClienteCriarEmailComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ClienteCriarEmail>;
    mercados: Mercado[];
    idEmpresa: string = '';
    mercadoDataInputDropdown = MercadoDataInputDropdown;

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

        this.form = this.fb.group<ClienteCriarEmail>({
            idEmpresa: [this.idEmpresa],
            nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            email: ["", [Validators.required, Validators.maxLength(70), Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]],
            idMercado: ["", [Validators.required]]
        });
        this.form.setFormErrors({
            idEmpresa: {},
            nome: { required: "Nome é requerido", minlength: "Minímo de 3 caracteres", maxlength: "Máximo de 70 caracteres." },
            email: { required: "E-mail é requirido.", pattern: "E-mail inválido" },
            idMercado: { required: "Mercado é requirido.", maxlength: "Máximo de 70 caracteres.", notMatchValue: "Entrada inválida." }
        });
    }

    criarCliente(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.spinnerService.show();
        this.clienteService.clienteCriarEnviarEmail(this.form.value)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
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
