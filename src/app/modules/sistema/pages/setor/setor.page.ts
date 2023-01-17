import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { merge, map, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { TableComponent } from 'src/app/modules/shared/components/table/table.component';
import { Ordenacao } from 'src/app/modules/shared/models/ordenacao.model';
import { Paginacao } from 'src/app/modules/shared/models/paginacao.model';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
import { ModalSetorCriarComponent } from '../../components/modal-setor-criar/modal-setor-criar.component';
import { ModalSetorEditarComponent } from '../../components/modal-setor-editar/modal-setor-editar.component';
import { SetorDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Setor } from '../../models/interfaces/setor.interface';
import { EmpresaService } from '../../services/empresa.service';
import { SetorService } from '../../services/setor.service';

@Component({
    selector: 'bpgear-setor',
    templateUrl: './setor.page.html',
    styleUrls: ['./setor.page.scss']
})
export class SetorPage implements OnInit, OnDestroy, AfterViewInit {
    setorDataViewConfig = SetorDataViewConfig;
    setores: Setor[] = [];

    @ViewChild('table') table;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private setorService: SetorService,
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
                    this.obterSetores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(response => response);
    }

    obterSetores(paginacao?: Paginacao, ordenacao?: Ordenacao): void {
        this.spinnerService.show();
        this.setorService.obterSetores(this.empresaService.getEmpresa().value.id, paginacao, ordenacao)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.setores = response.data;
                }
            );
    }

    criarSetor(): void {
        const modalRef = this.modalService.open(ModalSetorCriarComponent, { size: 'md' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterSetores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    editarSetor(setor: Setor): void {
        const modalRef = this.modalService.open(ModalSetorEditarComponent, { size: 'md' });
        modalRef.componentInstance.setor = setor;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterSetores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    deletarSetor(setor: Setor): void {
        const modalRef = this.modalService.open(ModalDeletarComponent, { size: 'md' });
        modalRef.componentInstance.setor = setor;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterSetores(
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
