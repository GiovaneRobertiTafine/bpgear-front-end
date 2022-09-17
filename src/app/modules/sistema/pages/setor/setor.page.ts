import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
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
export class SetorPage implements OnInit, OnDestroy {
    setorDataViewConfig = SetorDataViewConfig;
    setores: Setor[] = [];

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private setorService: SetorService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private empresaService: EmpresaService
    ) { }

    ngOnInit(): void {
        this.obterSetores();
    }

    obterSetores(): void {
        this.spinnerService.show();
        this.setorService.obterSetores(this.empresaService.getEmpresa().value.id)
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
                    this.obterSetores();
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
                    this.obterSetores();
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
                    this.obterSetores();
                }
            })
            .catch((err) => err);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }

}
