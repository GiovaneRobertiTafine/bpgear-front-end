import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MercadoDataInputDropdown } from '../../models/constants/sistema-data-input-dropdown-config.constant';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { ClienteCriarEnviarEmail } from '../../models/requests/cliente-criar-enviar-email.request';
import { ClienteService } from '../../services/cliente.service';
import { ColaboradorService } from '../../services/colaborador.service';
import { EmpresaService } from '../../services/empresa.service';

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
        private clienteService: ClienteService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
        this.idEmpresa = this.empresaService.getEmpresa().value.id;

        this.form = this.fb.group<ClienteCriarEnviarEmail>({
            idEmpresa: [this.idEmpresa],
            nomeCliente: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
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
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.spinnerService.show();
        this.clienteService.clienteCriarEnviarEmail(this.form.value)
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
