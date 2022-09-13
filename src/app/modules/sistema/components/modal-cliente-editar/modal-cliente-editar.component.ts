import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MercadoDataInputDropdown } from '../../models/constants/sistema-data-input-dropdown-config.constant';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { ClienteEditar } from '../../models/requests/cliente-editar.request';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'bpgear-modal-cliente-editar',
    templateUrl: './modal-cliente-editar.component.html',
    styleUrls: ['./modal-cliente-editar.component.scss']
})
export class ModalClienteEditarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ClienteEditar>;
    cliente: Cliente;
    mercados: Mercado[] = [];
    mercadoDataInputDropdown = MercadoDataInputDropdown;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private clienteService: ClienteService,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<ClienteEditar>({
            id: [this.cliente.id],
            idMercado: [this.cliente.mercado.id, [Validators.required, Validators.minLength(3)]]
        });

        this.form.setFormErrors({
            id: {},
            idMercado: { required: "Mercado é requirido.", maxlength: "Máximo de 70 caracteres.", notMatchValue: "Entrada inválida." }
        });
    }

    editarCliente(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.spinnerService.show();
        this.clienteService.editarCliente(this.form.value)
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
