import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { BemServico } from '../../models/interfaces/bem-servico.interface';
import { BemServicoEditar } from '../../models/requests/bem-servico-editar.request';
import { BemServicoService } from '../../services/bem-servico.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-bem-servico-editar',
    templateUrl: './modal-bem-servico-editar.component.html',
    styleUrls: ['./modal-bem-servico-editar.component.scss']
})
export class ModalBemServicoEditarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<BemServicoEditar>;
    bemServico: BemServico;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private bemServicoService: BemServicoService,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<BemServicoEditar>({
            id: [this.bemServico.id],
            nome: [this.bemServico.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            idEmpresa: [this.empresaService.getEmpresa().value.id],
        });

        this.form.setFormErrors({
            id: {},
            nome: { required: "Nome é requerido", minlength: "Mínimo de 3 caracteres", maxlength: "Máximo de 70 caracteres." },
            idEmpresa: {}
        });
    }

    editarBemServico(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: BemServicoEditar = { ...this.form.value };
        this.spinnerService.show();
        this.bemServicoService.editarBemServico(request)
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
