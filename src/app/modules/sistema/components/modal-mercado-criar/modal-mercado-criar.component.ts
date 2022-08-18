import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { MercadoCriar } from '../../models/requests/mercado-criar.request';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';
import { pipe, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'bpgear-modal-mercado-criar',
    templateUrl: './modal-mercado-criar.component.html',
    styleUrls: ['./modal-mercado-criar.component.scss']
})
export class ModalMercadoCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<MercadoCriar>;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private mercadoService: MercadoService,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<MercadoCriar>({
            idEmpresa: [this.empresaService.getEmpresa().value.id],
            nomeMercado: ["", [Validators.required, Validators.minLength(3)]]
        });

        this.form.setFormErrors({
            idEmpresa: {},
            nomeMercado: { required: "Nome é requerido", minlength: "Minímo de 3 caracteres" }
        });
    }

    criarMercado(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.spinnerService.show();
        this.mercadoService.criarMercado(this.form.value)
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
