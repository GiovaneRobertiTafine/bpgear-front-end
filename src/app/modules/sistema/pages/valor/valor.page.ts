import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
import { ModalValorCriarComponent } from '../../components/modal-valor-criar/modal-valor-criar.component';
import { ModalValorEditarComponent } from '../../components/modal-valor-editar/modal-valor-editar.component';
import { ValorDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Valor } from '../../models/interfaces/valor.inteface';
import { EmpresaService } from '../../services/empresa.service';
import { ValorService } from '../../services/valor.service';

@Component({
    selector: 'bpgear-valor',
    templateUrl: './valor.page.html',
    styleUrls: ['./valor.page.scss']
})
export class ValorPage implements OnInit, OnDestroy {
    valorDataViewConfig = ValorDataViewConfig;
    valores: Valor[] = [];

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private valorService: ValorService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.obterValores();
    }

    obterValores(): void {
        this.spinnerService.show();
        this.valorService.obterValores(this.empresaService.getEmpresa().value.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.valores = response.data;
                }
            );
    }

    criarValor(): void {
        const modalRef = this.modalService.open(ModalValorCriarComponent, { size: 'md' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterValores();
                }
            })
            .catch((err) => err);
    }

    editarValor(valor: Valor): void {
        const modalRef = this.modalService.open(ModalValorEditarComponent, { size: 'md' });
        modalRef.componentInstance.valor = valor;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterValores();
                }
            })
            .catch((err) => err);
    }

    deletarValor(valor: Valor): void {
        const modalRef = this.modalService.open(ModalDeletarComponent, { size: 'md' });
        modalRef.componentInstance.valor = valor;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterValores();
                }
            })
            .catch((err) => err);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
