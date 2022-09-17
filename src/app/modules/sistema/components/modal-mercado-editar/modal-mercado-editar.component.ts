import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { MercadoEditar } from '../../models/requests/mercado-editar.request';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-modal-mercado-editar',
    templateUrl: './modal-mercado-editar.component.html',
    styleUrls: ['./modal-mercado-editar.component.scss']
})
export class ModalMercadoEditarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<MercadoEditar>;
    mercado: Mercado;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private mercadoService: MercadoService,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<MercadoEditar>({
            id: [this.mercado.id],
            nome: [this.mercado.nome, [Validators.required, Validators.minLength(3)]]
        });

        this.form.setFormErrors({
            id: {},
            nome: { required: "Nome é requerido", minlength: "Minímo de 3 caracteres" }
        });
    }

    editarMercado(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: MercadoEditar = { ...this.form.value };
        this.spinnerService.show();
        this.mercadoService.editarMercado(request)
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
