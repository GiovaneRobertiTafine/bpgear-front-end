import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { CpfCnpjValidator } from 'src/app/modules/shared/utils/cpf-cnpj.validator';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaEditar } from '../../models/requests/empresa-editar.request';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-empresa-editar',
    templateUrl: './modal-empresa-editar.component.html',
    styleUrls: ['./modal-empresa-editar.component.scss']
})
export class ModalEmpresaEditarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<EmpresaEditar>;
    usuario = "";
    empresa: Empresa = null;
    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<EmpresaEditar>({
            id: [this.empresa.id],
            idUsuario: [this.authService.getUsuario().value.id],
            nomeEmpresa: [this.empresa.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            cnpj: [this.empresa.cnpj, [Validators.required, CpfCnpjValidator]],
            razaoSocial: [this.empresa.razaoSocial, [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
            responsavel: [this.empresa.responsavel, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            telefone: [this.empresa.telefone, [Validators.required, Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)]]
        });
        this.form.setFormErrors({
            id: {},
            idUsuario: {},
            nomeEmpresa: { required: "Nome é requerido.", minlength: "Mínimo de 3 caracteres.", maxlength: "Máximo de 70 caracteres." },
            cnpj: { required: "CNPJ é requirido.", mask: "CNPJ inválido", invalidCpfCnpj: "CNPJ inválido." },
            razaoSocial: { required: "Razão Social é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 70 caracteres." },
            responsavel: { required: "Responsável é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres." },
            telefone: { required: "Telefone é requerido.", mask: "Telefone inválido", pattern: "Telefone inválido" }
        });
    }

    editarEmpresa(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const reuqest: EmpresaEditar = { ...this.form.value };
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
