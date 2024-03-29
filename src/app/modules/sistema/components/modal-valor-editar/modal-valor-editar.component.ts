import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { Valor } from '../../models/interfaces/valor.inteface';
import { ValorEditar } from '../../models/requests/valor-editar.request';
import { EmpresaService } from '../../services/empresa.service';
import { ValorService } from '../../services/valor.service';

@Component({
    selector: 'bpgear-modal-valor-editar',
    templateUrl: './modal-valor-editar.component.html',
    styleUrls: ['./modal-valor-editar.component.scss']
})
export class ModalValorEditarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<ValorEditar>;
    valor: Valor;

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
        this.form = this.fb.group<ValorEditar>({
            id: [this.valor.id],
            idEmpresa: [this.empresaService.getEmpresa().value.id],
            nome: [this.valor.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            definicaoValor: [this.valor.definicaoValor, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
        });

        this.form.setFormErrors({
            id: {},
            idEmpresa: {},
            nome: { required: "Nome é requerido", minlength: "Mínimo de 3 caracteres", maxlength: "Máximo de 70 caracteres." },
            definicaoValor: { required: "Definição de valor é requerido", minlength: "Mínimo de 5 caracteres", maxlength: "Máximo de 200 caracteres." }
        });
    }

    editarValor(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: ValorEditar = { ...this.form.value };
        this.spinnerService.show();
        this.valorService.editarValor(request)
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
