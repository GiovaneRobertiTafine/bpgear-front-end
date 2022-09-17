import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { ValorCriar } from '../../models/requests/valor-criar.request';
import { EmpresaService } from '../../services/empresa.service';
import { ValorService } from '../../services/valor.service';

@Component({
    selector: 'bpgear-modal-valor-criar',
    templateUrl: './modal-valor-criar.component.html',
    styleUrls: ['./modal-valor-criar.component.scss']
})
export class ModalValorCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ValorCriar>;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private valorService: ValorService,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<ValorCriar>({
            idEmpresa: [this.empresaService.getEmpresa().value.id],
            nome: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            definicaoValor: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
        });

        this.form.setFormErrors({
            idEmpresa: {},
            nome: { required: "Nome é requerido", minlength: "Mínimo de 3 caracteres", maxlength: "Máximo de 70 caracteres." },
            definicaoValor: { required: "Definição de valor é requerido", minlength: "Mínimo de 5 caracteres", maxlength: "Máximo de 200 caracteres." }
        });
    }

    criarValor(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: ValorCriar = { ...this.form.value };
        this.spinnerService.show();
        this.valorService.criarValor(request)
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
