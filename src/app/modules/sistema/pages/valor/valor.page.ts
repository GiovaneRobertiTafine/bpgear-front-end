import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, merge, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Ordenacao } from 'src/app/modules/shared/models/ordenacao.model';
import { Paginacao } from 'src/app/modules/shared/models/paginacao.model';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
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
export class ValorPage implements OnInit, OnDestroy, AfterViewInit {
    valorDataViewConfig = ValorDataViewConfig;
    valores: Valor[] = [];

    @ViewChild('table') table: any;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private valorService: ValorService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        merge(this.table.paginacaoChange, this.table.ordenacaoChange)
            .pipe(
                startWith({}),
                tap(() => {
                    this.obterValores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(response => response);
    }

    obterValores(paginacao?: Paginacao, ordenacao?: Ordenacao): void {
        this.spinnerService.show();
        this.valorService.obterValores(this.empresaService.getEmpresa().value.id, paginacao, ordenacao)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.valores = response.data;
                    this.table.colecaoTamanho = response.resultPaginacao.colecaoTamanho;
                }
            );
    }

    criarValor(): void {
        const modalRef = this.modalService.open(ModalValorCriarComponent, { size: 'md' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterValores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
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
                    this.obterValores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
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
                    this.obterValores(
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
