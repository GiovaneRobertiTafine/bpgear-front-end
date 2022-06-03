import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormTypeBuilder } from 'reactive-forms-typed';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaDeletar } from '../../models/requests/empresa-deletar.request';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-empresa-deletar',
    templateUrl: './modal-empresa-deletar.component.html',
    styleUrls: ['./modal-empresa-deletar.component.scss']
})
export class ModalEmpresaDeletarComponent implements OnInit {
    empresa: Empresa;
    constructor(
        public activeModal: NgbActiveModal,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
    }

    deletarEmpresa(): void {
        const request: EmpresaDeletar = { id: this.empresa.id };
        this.spinnerService.show();
        this.empresaService.deletarEmpresa(request)
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
