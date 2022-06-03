import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-empresa-editar',
    templateUrl: './modal-empresa-editar.component.html',
    styleUrls: ['./modal-empresa-editar.component.scss']
})
export class ModalEmpresaEditarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<Empresa>;
    usuario = "";
    empresa: Empresa = null;
    unsubscribe$: Subject<boolean> = new Subject<boolean>();
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<Empresa>({
            nomeEmpresa: [this.empresa.nomeEmpresa, [Validators.required]],
            cnpj: [this.empresa.cnpj, [Validators.required]],
            razaoSocial: [this.empresa.razaoSocial, [Validators.required]],
            responsavel: [this.empresa.responsavel, [Validators.required]],
            telefone: [this.empresa.telefone, [Validators.required, Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)]]
        });
        this.form.setFormErrors({
            nomeEmpresa: { required: "Nome da empresa é requirido." },
            cnpj: { required: "CNPJ é requirido.", mask: "CNPJ inválido" },
            razaoSocial: { required: "Razão social é requirido." },
            responsavel: { required: "Reponsável é requirido." },
            telefone: { required: "Telefone é requirido.", mask: "Telefone inválido", pattern: "Telefone inválido" }
        });
    }

    editarEmpresa(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const reuqest: Empresa = { ...this.form.value, id: this.empresa.id };
        this.spinnerService.show();
        this.empresaService.editarEmpresa(reuqest)
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

    get formControl() { return this.form.controls; }
    get formGroup() { return this.form as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
