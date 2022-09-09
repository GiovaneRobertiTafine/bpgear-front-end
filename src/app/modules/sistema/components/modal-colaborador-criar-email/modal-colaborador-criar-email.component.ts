import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ColaboradorCriarEmail } from '../../models/requests/colaborador-criar-email.request';
import { ColaboradorService } from '../../services/colaborador.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-colaborador-criar-email',
    templateUrl: './modal-colaborador-criar-email.component.html',
    styleUrls: ['./modal-colaborador-criar-email.component.scss']
})
export class ModalColaboradorCriarEmailComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ColaboradorCriarEmail>;
    idEmpresa = '';

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private colaboradorService: ColaboradorService,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<ColaboradorCriarEmail>({
            idEmpresa: [this.empresaService.getEmpresa().value.id],
            nome: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            email: ["", [Validators.required, Validators.maxLength(70), Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]]
        });
        this.form.setFormErrors({
            idEmpresa: {},
            nome: { required: "Nome é requerido", minlength: "Minímo de 10 caracteres", maxlength: "Máximo de 70 caracteres." },
            email: { required: "E-mail é requirido.", pattern: "E-mail inválido", maxlength: "Máximo de 70 caracteres." }
        });
    }

    criarColaborador(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.spinnerService.show();
        this.colaboradorService.colaboradorCriarEnviarEmail(this.form.value)
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
