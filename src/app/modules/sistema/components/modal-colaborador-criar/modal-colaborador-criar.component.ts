import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { pipe, Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ColaboradorCriarEnviarEmail } from '../../models/requests/colaborador-criar-enviar-email.request';
import { ColaboradorCriar } from '../../models/requests/colaborador-criar.request';
import { ColaboradorService } from '../../services/colaborador.service';

@Component({
    selector: 'bpgear-modal-colaborador-criar',
    templateUrl: './modal-colaborador-criar.component.html',
    styleUrls: ['./modal-colaborador-criar.component.scss']
})
export class ModalColaboradorCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ColaboradorCriarEnviarEmail>;
    idEmpresa = '';
    unsubscribe$: Subject<boolean> = new Subject<boolean>();
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private colaboradorService: ColaboradorService,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<ColaboradorCriarEnviarEmail>({
            idEmpresa: [this.idEmpresa],
            email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)]]
        });
        this.form.setFormErrors({
            idEmpresa: {},
            email: { required: "E-mail é requirido.", pattern: "E-mail inválido" }
        });
    }

    criarColaborador(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.spinnerService.show();
        this.colaboradorService.colaboradorCriarEnviarEmail(this.form.value)
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
