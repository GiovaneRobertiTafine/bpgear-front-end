import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgTypeFormGroup, FormTypeBuilder } from 'reactive-forms-typed';
import { Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaCriar } from '../../models/requests/empresa-criar.request';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-empresa-criar',
    templateUrl: './modal-empresa-criar.component.html',
    styleUrls: ['./modal-empresa-criar.component.scss']
})
export class ModalEmpresaCriarComponent implements OnInit, OnDestroy {
    form: NgTypeFormGroup<Empresa>;
    usuario = "";
    unsubscribe$: Subject<boolean> = new Subject<boolean>();
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinner: SpinnerService,
        private toast: ToastService,
        private empresaService: EmpresaService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<Empresa>({
            nomeEmpresa: ["", [Validators.required]],
            cnpj: ["", [Validators.required]],
            razaoSocial: ["", [Validators.required]],
            responsavel: ["", [Validators.required]],
            telefone: ["", [Validators.required, Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)]]
        });
        this.form.setFormErrors({
            nomeEmpresa: { required: "Nome da empresa é requirido." },
            cnpj: { required: "CNPJ é requirido.", mask: "CNPJ inválido" },
            razaoSocial: { required: "Razão social é requirido." },
            responsavel: { required: "Reponsável é requirido." },
            telefone: { required: "Telefone é requirido.", mask: "Telefone inválido", pattern: "Telefone inválido" }
        });

        this.authService.getUsuario()
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                (u) => this.usuario = u.usuario
            );
    }

    criarEmpresa(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const request: EmpresaCriar = { ...this.form.value, usuario: { login: this.usuario } };
        this.spinner.show();
        this.empresaService.criarEmpresa(request)
            .pipe(
                takeUntil(this.unsubscribe$)
            )
            .subscribe(
                (response) => {
                    this.spinner.hide();
                    if (response.resultStatus.code !== 201) {
                        this.toast.error(response.resultStatus.message);
                        return;
                    }
                    this.toast.success(response.resultStatus.message);
                    this.activeModal.close(true);
                }
            );

    }

    validateClass(field: string): string {
        if (this.formControl[field].errors && (this.formControl[field].dirty || this.formControl[field].touched)) {
            return "border-danger";
        } else if (this.formControl[field].value && this.formControl[field].touched) {
            return "border-success";
        }
        return "";
    }

    get formControl() { return this.form.controls; }
    get formGroup() { return this.form as FormGroup; }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
