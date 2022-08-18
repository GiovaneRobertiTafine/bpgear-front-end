import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { MercadoDeletar } from '../../models/requests/mercado-deletar.request';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-modal-mercado-deletar',
    templateUrl: './modal-mercado-deletar.component.html',
    styleUrls: ['./modal-mercado-deletar.component.scss']
})
export class ModalMercadoDeletarComponent implements OnInit, OnDestroy {
    mercado: Mercado;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private mercadoService: MercadoService
    ) { }

    ngOnInit(): void {
    }

    deletarMercado(): void {
        const deletarMercado: MercadoDeletar = { idMercado: this.mercado.id };
        this.spinnerService.show();
        this.mercadoService.deletarMercado(deletarMercado)
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
