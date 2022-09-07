import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { ClienteDeletar } from '../../models/requests/cliente-deletar.request';
import { ClienteService } from '../../services/cliente.service';

@Component({
    selector: 'bpgear-modal-cliente-deletar',
    templateUrl: './modal-cliente-deletar.component.html',
    styleUrls: ['./modal-cliente-deletar.component.scss']
})
export class ModalClienteDeletarComponent implements OnInit, OnDestroy {
    cliente: Cliente;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private clienteService: ClienteService
    ) { }

    ngOnInit(): void {
    }

    deletarCliente(): void {
        const deletarCliente: ClienteDeletar = { id: this.cliente.id };
        this.spinnerService.show();
        this.clienteService.deletarCliente(deletarCliente)
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
