import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { merge, startWith, Subject, takeUntil, tap } from 'rxjs';
import { Ordenacao } from 'src/app/modules/shared/models/ordenacao.model';
import { Paginacao } from 'src/app/modules/shared/models/paginacao.model';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { ModalBemServicoCriarComponent } from '../../components/modal-bem-servico-criar/modal-bem-servico-criar.component';
import { ModalBemServicoEditarComponent } from '../../components/modal-bem-servico-editar/modal-bem-servico-editar.component';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
import { BemServicoDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { BemServico } from '../../models/interfaces/bem-servico.interface';
import { BemServicoService } from '../../services/bem-servico.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-bem-servico',
    templateUrl: './bem-servico.page.html',
    styleUrls: ['./bem-servico.page.scss']
})
export class BemServicoPage implements OnInit, OnDestroy {
    bemServico: BemServico[] = [];
    bemServicoDataViewConfig = BemServicoDataViewConfig;

    @ViewChild('table') table;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private bemServicoService: BemServicoService,
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
                    this.obterBensServicos(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(response => response);
    }

    obterBensServicos(paginacao?: Paginacao, ordenacao?: Ordenacao): void {
        this.spinnerService.show();
        this.bemServicoService.obterBensServicos(this.empresaService.getEmpresa().value.id, paginacao, ordenacao)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.bemServico = response.data;
                }
            );
    }

    criarBemServico(): void {
        const modalRef = this.modalService.open(ModalBemServicoCriarComponent, { size: 'md' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterBensServicos(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    deletarBemServico(bemServico: BemServico): void {
        const modalRef = this.modalService.open(ModalDeletarComponent, { size: 'md' });
        modalRef.componentInstance.bemServico = bemServico;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterBensServicos(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    editarBemServico(bemServico: BemServico): void {
        const modalRef = this.modalService.open(ModalBemServicoEditarComponent, { size: 'md' });
        modalRef.componentInstance.bemServico = bemServico;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterBensServicos(
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
