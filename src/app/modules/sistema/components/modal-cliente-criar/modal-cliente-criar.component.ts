import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder, NgTypeFormGroup } from 'reactive-forms-typed';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { ColaboradorService } from '../../services/colaborador.service';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-modal-cliente-criar',
    templateUrl: './modal-cliente-criar.component.html',
    styleUrls: ['./modal-cliente-criar.component.scss']
})
export class ModalClienteCriarComponent implements OnInit {
    form: NgTypeFormGroup<null>;
    mercados: Mercado[] = [];
    empresa: string = "";
    constructor(
        public activeModal: NgbActiveModal,
        private fb: FormTypeBuilder,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private colaboradorService: ColaboradorService,
        private mercadoService: MercadoService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
        this.empresa = this.empresaService.getEmpresa().value.id;
    }

    criarCliente(): void {

    }
}
