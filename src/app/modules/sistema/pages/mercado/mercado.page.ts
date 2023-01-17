import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, merge, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { DirecaoOrdenacao } from 'src/app/modules/shared/models/data-view-config.model';
import { Ordenacao } from 'src/app/modules/shared/models/ordenacao.model';
import { Paginacao } from 'src/app/modules/shared/models/paginacao.model';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
import { ModalMercadoCriarComponent } from '../../components/modal-mercado-criar/modal-mercado-criar.component';
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
export class MercadoPage implements OnInit, OnDestroy, AfterViewInit {
    mercadoDataViewConfig = MercadoDataViewConfig;
    mercados: Mercado[] = [];

    @ViewChild('table') table: any;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private mercadoService: MercadoService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        merge(this.table.paginacaoChange, this.table.ordenacaoChange)
            .pipe(
                startWith({}),
                tap(() => {
                    this.obterMercados(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(response => response);
    }

    obterMercados(paginacao?: Paginacao, ordenacao?: Ordenacao): void {
        this.spinnerService.show();
        this.mercadoService.obterMercados(this.empresaService.getEmpresa().value.id, paginacao, ordenacao)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(response => {
                this.spinnerService.hide();
                if (response.resultStatus.code !== 200) {
                    this.toastService.error(response.resultStatus.message);
                    return;
                }

                this.mercados = response.data;
                this.table.colecaoTamanho = response.resultPaginacao.colecaoTamanho;
            });
    }

    criarMercado(): void {
        const modalRef = this.modalService.open(ModalMercadoCriarComponent, { size: 'md' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterMercados(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    deletarMercado(mercado: Mercado): void {
        const modalRef = this.modalService.open(ModalDeletarComponent, { size: 'md' });
        modalRef.componentInstance.mercado = mercado;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterMercados(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
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
                    this.obterMercados(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }

}
