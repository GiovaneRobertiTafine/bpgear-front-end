import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { ColaboradorEditar } from '../../models/requests/colaborador-editar.request';
import { ColaboradorService } from '../../services/colaborador.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'bpgear-modal-colaborador-editar',
    templateUrl: './modal-colaborador-editar.component.html',
    styleUrls: ['./modal-colaborador-editar.component.scss']
})
export class ModalColaboradorEditarComponent implements OnInit {
    form: NgTypeFormGroup<ColaboradorEditar>;
    colaborador: Colaborador;
    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private colaboradorService: ColaboradorService,
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group<ColaboradorEditar>({
            id: [this.colaborador.id],
            nome: [this.colaborador.nome, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]],
            pesquisaAtiva: [this.colaborador.pesquisaAtiva, [Validators.required]],
        });
        this.form.setFormErrors({
            id: {},
            nome: { required: "Nome é requirido.", minlength: "Minímo de 10 caracteres." },
            pesquisaAtiva: { required: "Pesquisa é requirido." },
        });
    }

    get formControl() { return this.form.controls; }
    get formGroup() { return this.form as FormGroup; }

    editarColaborador(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.spinnerService.show();
        this.colaboradorService.editarColaborador(this.form.value)
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
}
