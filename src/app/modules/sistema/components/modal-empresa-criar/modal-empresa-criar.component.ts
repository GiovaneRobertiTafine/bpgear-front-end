import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgTypeFormGroup, FormTypeBuilder } from 'reactive-forms-typed';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { CpfCnpjValidator } from 'src/app/modules/shared/utils/cpf-cnpj.validator';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaCriar } from '../../models/requests/empresa-criar.request';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-empresa-criar',
    templateUrl: './modal-empresa-criar.component.html',
    styleUrls: ['./modal-empresa-criar.component.scss']
})
export class ModalEmpresaCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<EmpresaCriar>;
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
        this.form = this.fb.group<EmpresaCriar>({
            idUsuario: [this.authService.getUsuario().value.id],
            nomeEmpresa: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
            cnpj: ["", [Validators.required, CpfCnpjValidator]],
            razaoSocial: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(70)]],
            responsavel: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            telefone: ["", [Validators.required, Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)]]
        });
        this.form.setFormErrors({
            nomeEmpresa: { required: "Nome é requerido.", minlength: "Mínimo de 3 caracteres.", maxlength: "Máximo de 70 caracteres." },
            cnpj: { required: "CNPJ é requerido.", mask: "CNPJ inválido.", invalidCpfCnpj: "CNPJ inválido." },
            razaoSocial: { required: "Razão Social é requerido.", minlength: "Mínimo de 5 caracteres.", maxlength: "Máximo de 70 caracteres." },
            responsavel: { required: "Responsável é requerido.", minlength: "Mínimo de 10 caracteres.", maxlength: "Máximo de 70 caracteres." },
            telefone: { required: "Telefone é requirido.", mask: "Telefone inválido", pattern: "Telefone inválido" },
            idUsuario: {}
        });

    }

    criarEmpresa(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: EmpresaCriar = { ...this.form.value };
        this.spinnerService.show();
        this.empresaService.criarEmpresa(request)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 201) {
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
