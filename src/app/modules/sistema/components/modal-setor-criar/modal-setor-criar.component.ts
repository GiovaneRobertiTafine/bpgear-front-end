import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SetorCriar } from '../../models/requests/setor-criar.request';
import { EmpresaService } from '../../services/empresa.service';
import { SetorService } from '../../services/setor.service';

@Component({
    selector: 'bpgear-modal-setor-criar',
    templateUrl: './modal-setor-criar.component.html',
    styleUrls: ['./modal-setor-criar.component.scss']
})
export class ModalSetorCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<SetorCriar>;

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
        this.form = this.fb.group<SetorCriar>({
            idEmpresa: [this.empresaService.getEmpresa().value.id],
            nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
        });

        this.form.setFormErrors({
            idEmpresa: {},
            nome: { required: "Nome é requerido", minlength: "Mínimo de 3 caracteres", maxlength: "Máximo de 70 caracteres." },
        });
    }

    criarSetor(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: SetorCriar = { ...this.form.value };
        this.spinnerService.show();
        this.setorService.criarSetor(request)
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
