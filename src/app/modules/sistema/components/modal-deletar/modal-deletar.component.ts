import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { ClienteDeletar } from '../../models/requests/cliente-deletar.request';
import { DeletarColaborador } from '../../models/requests/colaborador-deletar.request';
import { MercadoDeletar } from '../../models/requests/mercado-deletar.request';
import { ClienteService } from '../../services/cliente.service';
import { ColaboradorService } from '../../services/colaborador.service';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-modal-deletar',
    templateUrl: './modal-deletar.component.html',
    styleUrls: ['./modal-deletar.component.scss']
})
export class ModalDeletarComponent implements OnInit, OnDestroy {
    cliente: Cliente = null;
    colaborador: Colaborador = null;
    mercado: Mercado = null;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private clienteService: ClienteService,
        private colaboradorService: ColaboradorService,
        private mercadoService: MercadoService
    ) { }

    ngOnInit(): void {
    }

    deletarColaborador(): void {
        const deletarColaborador: DeletarColaborador = { id: this.colaborador.id };
        this.spinnerService.show();
        this.colaboradorService.deletarColaborador(deletarColaborador)
            .pipe(takeUntil(this.unsubscribe$))
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

    deletarCliente(): void {
        const deletarCliente: ClienteDeletar = { id: this.cliente.id };
        this.spinnerService.show();
        this.clienteService.deletarCliente(deletarCliente)
            .pipe(takeUntil(this.unsubscribe$))
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

    deletarMercado(): void {
        const deletarMercado: MercadoDeletar = { id: this.mercado.id };
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
