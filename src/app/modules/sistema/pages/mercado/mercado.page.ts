import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ModalMercadoCriarComponent } from '../../components/modal-mercado-criar/modal-mercado-criar.component';
import { ModalMercadoDeletarComponent } from '../../components/modal-mercado-deletar/modal-mercado-deletar.component';
import { ModalMercadoEditarComponent } from '../../components/modal-mercado-editar/modal-mercado-editar.component';
import { MercadoDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Mercado } from '../../models/interfaces/mercado.interface';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-mercado',
    templateUrl: './mercado.page.html',
    styleUrls: ['./mercado.page.scss']
})
export class MercadoPage implements OnInit, OnDestroy {
    mercadoDataViewConfig = MercadoDataViewConfig;
    mercados: Mercado[] = [];

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private mercadoService: MercadoService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.obterMercados();
    }

    obterMercados(): void {
        this.spinnerService.show();
        this.mercadoService.obterMercados(this.empresaService.getEmpresa().value.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.mercados = response.data;
                    console.log(this.mercados);
                }
            );
    }

    criarMercado(): void {
        const modalRef = this.modalService.open(ModalMercadoCriarComponent, { size: 'md' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterMercados();
                }
            })
            .catch((err) => err);
    }

    deletarMercado(mercado: Mercado): void {
        const modalRef = this.modalService.open(ModalMercadoDeletarComponent, { size: 'md' });
        modalRef.componentInstance.mercado = mercado;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterMercados();
                }
            })
            .catch((err) => err);
    }

    editarMercado(mercado: Mercado): void {
        const modalRef = this.modalService.open(ModalMercadoEditarComponent, { size: 'md' });
        modalRef.componentInstance.mercado = mercado;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterMercados();
                }
            })
            .catch((err) => err);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }

}
