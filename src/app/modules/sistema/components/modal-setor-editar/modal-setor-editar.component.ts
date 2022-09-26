import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { Setor } from '../../models/interfaces/setor.interface';
import { SetorEditar } from '../../models/requests/setor-editar.request';
import { EmpresaService } from '../../services/empresa.service';
import { SetorService } from '../../services/setor.service';

@Component({
    selector: 'bpgear-modal-setor-editar',
    templateUrl: './modal-setor-editar.component.html',
    styleUrls: ['./modal-setor-editar.component.scss']
})
export class ModalSetorEditarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<SetorEditar>;
    setor: Setor;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private setorService: SetorService,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<SetorEditar>({
            id: [this.setor.id],
            nome: [this.setor.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            idEmpresa: [this.empresaService.getEmpresa().value.id],
        });

        this.form.setFormErrors({
            id: {},
            nome: { required: "Nome é requerido", minlength: "Mínimo de 3 caracteres", maxlength: "Máximo de 70 caracteres." },
            idEmpresa: {}
        });
    }

    editarSetor(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: SetorEditar = { ...this.form.value };
        this.spinnerService.show();
        this.setorService.editarSetor(request)
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
