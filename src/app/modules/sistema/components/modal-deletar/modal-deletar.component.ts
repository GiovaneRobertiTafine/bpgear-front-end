import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { BemServico } from '../../models/interfaces/bem-servico.interface';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { Setor } from '../../models/interfaces/setor.interface';
import { Valor } from '../../models/interfaces/valor.inteface';
import { BemServicoDeletar } from '../../models/requests/bem-servico-deletar.request';
import { ClienteDeletar } from '../../models/requests/cliente-deletar.request';
import { DeletarColaborador } from '../../models/requests/colaborador-deletar.request';
import { EmpresaDeletar } from '../../models/requests/empresa-deletar.request';
import { MercadoDeletar } from '../../models/requests/mercado-deletar.request';
import { SetorDeletar } from '../../models/requests/setor-deletar.request';
import { ValorDeletar } from '../../models/requests/valor-deletar.request';
import { BemServicoService } from '../../services/bem-servico.service';
import { ClienteService } from '../../services/cliente.service';
import { ColaboradorService } from '../../services/colaborador.service';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';
import { SetorService } from '../../services/setor.service';
import { ValorService } from '../../services/valor.service';

@Component({
    selector: 'bpgear-modal-deletar',
    templateUrl: './modal-deletar.component.html',
    styleUrls: ['./modal-deletar.component.scss']
})
export class ModalDeletarComponent implements OnInit, OnDestroy {
    empresa: Empresa = null;
    cliente: Cliente = null;
    colaborador: Colaborador = null;
    mercado: Mercado = null;
    valor: Valor = null;
    setor: Setor = null;
    bemServico: BemServico = null;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        public activeModal: NgbActiveModal,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private empresaService: EmpresaService,
        private clienteService: ClienteService,
        private colaboradorService: ColaboradorService,
        private mercadoService: MercadoService,
        private valorService: ValorService,
        private setorService: SetorService,
        private bemServicoService: BemServicoService
    ) { }

    ngOnInit(): void {
    }

    deletarEmpresa(): void {
        const request: EmpresaDeletar = { id: this.empresa.id };
        this.spinnerService.show();
        this.empresaService.deletarEmpresa(request)
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

    deletarValor(): void {
        const deletarValor: ValorDeletar = { id: this.valor.id };
        this.spinnerService.show();
        this.valorService.deletarValor(deletarValor)
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

    deletarSetor(): void {
        const deletarValor: SetorDeletar = { id: this.setor.id };
        this.spinnerService.show();
        this.setorService.deletarSetor(deletarValor)
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

    deletarBemServico(): void {
        const deletarBemServico: BemServicoDeletar = { id: this.bemServico.id };
        this.spinnerService.show();
        this.bemServicoService.deletarBemServico(deletarBemServico)
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
