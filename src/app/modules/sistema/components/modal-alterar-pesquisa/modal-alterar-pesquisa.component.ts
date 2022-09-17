import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { Pesquisa } from '../../models/enums/pesquisa.enum';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { ClienteAlterarPesquisa } from '../../models/requests/cliente-alterar-pesquisa.request';
import { ColaboradorAlterarPesquisa } from '../../models/requests/colaborador-alterar-pesquisa.request';
import { ClienteService } from '../../services/cliente.service';
import { ColaboradorService } from '../../services/colaborador.service';

@Component({
    selector: 'bpgear-modal-alterar-pesquisa',
    templateUrl: './modal-alterar-pesquisa.component.html',
    styleUrls: ['./modal-alterar-pesquisa.component.scss']
})
export class ModalAlterarPesquisaComponent implements OnInit, OnDestroy {
    cliente: Cliente = null;
    colaborador: Colaborador = null;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private clienteService: ClienteService,
        private colaboradorService: ColaboradorService
    ) { }

    ngOnInit(): void {
    }

    alterarPesquisaColaborador(): void {
        const request: ColaboradorAlterarPesquisa = {
            id: this.colaborador.id,
            pesquisa: this.colaborador.pesquisa === Pesquisa[Pesquisa.ATIVADA + ''] ?
                Pesquisa.DESATIVADA : Pesquisa.ATIVADA
        };
        this.spinnerService.show();
        this.colaboradorService.alterarPesquisaColaborador(request)
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

    alterarPesquisaCliente(): void {
        const request: ClienteAlterarPesquisa = {
            id: this.cliente.id,
            pesquisa: this.cliente.pesquisa === Pesquisa[Pesquisa.ATIVADA + ''] ?
                Pesquisa.DESATIVADA : Pesquisa.ATIVADA
        };
        this.spinnerService.show();
        this.clienteService.alterarPesquisaCliente(request)
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

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
