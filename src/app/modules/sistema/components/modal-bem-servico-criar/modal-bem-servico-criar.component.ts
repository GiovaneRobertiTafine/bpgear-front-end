import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { BemServicoCriar } from '../../models/requests/bem-servico-criar.request';
import { BemServicoService } from '../../services/bem-servico.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-bem-servico-criar',
    templateUrl: './modal-bem-servico-criar.component.html',
    styleUrls: ['./modal-bem-servico-criar.component.scss']
})
export class ModalBemServicoCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<BemServicoCriar>;

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
        this.form = this.fb.group<BemServicoCriar>({
            idEmpresa: [this.empresaService.getEmpresa().value.id],
            nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
        });

        this.form.setFormErrors({
            idEmpresa: {},
            nome: { required: "Nome é requerido", minlength: "Mínimo de 3 caracteres", maxlength: "Máximo de 70 caracteres." },
        });
    }

    criarBemServico(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: BemServicoCriar = { ...this.form.value };
        this.spinnerService.show();
        this.bemServicoService.criarBemServico(request)
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
