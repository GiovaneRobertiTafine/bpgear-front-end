import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaDeletar } from '../../models/requests/empresa-deletar.request';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-modal-empresa-deletar',
    templateUrl: './modal-empresa-deletar.component.html',
    styleUrls: ['./modal-empresa-deletar.component.scss']
})
export class ModalEmpresaDeletarComponent implements OnInit, OnDestroy {
    empresa: Empresa;
    unsubscribe$: Subject<boolean> = new Subject<boolean>();

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

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
