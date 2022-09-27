import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { ModalAlterarPesquisaComponent } from '../../components/modal-alterar-pesquisa/modal-alterar-pesquisa.component';
import { ModalColaboradorCriarEmailComponent } from '../../components/modal-colaborador-criar-email/modal-colaborador-criar-email.component';
import { ModalColaboradorCriarComponent } from '../../components/modal-colaborador-criar/modal-colaborador-criar.component';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
import { ColaboradorDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { ColaboradorService } from '../../services/colaborador.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-colaborador',
    templateUrl: './colaborador.page.html',
    styleUrls: ['./colaborador.page.scss']
})
export class ColaboradorPage implements OnInit, OnDestroy, AfterViewInit {
    colaboradores: Colaborador[] = [];
    colaboradorDataViewConfig = ColaboradorDataViewConfig;
    @ViewChild('colAlterarPesquisa') colAlterarPesquisa;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private colaboradorService: ColaboradorService
    ) {
    }

    ngOnInit(): void {
        this.obterColaboradores();
    }

    ngAfterViewInit(): void {
        this.colaboradorDataViewConfig.colunas[this.colaboradorDataViewConfig.colunas.length - 1].template = this.colAlterarPesquisa;
    }

    obterColaboradores(): void {
        this.spinnerService.show();
        this.colaboradorService.obterColaboradores(this.empresaService.getEmpresa().value.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.colaboradores = response.data;
                }
            );
    }

    criarColaborador(): void {
        const modalRef = this.modalService.open(ModalColaboradorCriarComponent, { size: 'md' });
        modalRef.result
            .then(
                (res) => {
                    if (res) this.obterColaboradores();
                }
            )
            .catch((err) => err);
    }

    deletarColaborador(colaborador: Colaborador): void {
        const modalRef = this.modalService.open(ModalDeletarComponent, { size: 'md' });
        modalRef.componentInstance.colaborador = colaborador;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterColaboradores();
                }
            })
            .catch((err) => err);
    }

    alterarPesquisa(colaborador: Colaborador): void {
        const modalRef = this.modalService.open(ModalAlterarPesquisaComponent, { size: 'md' });
        modalRef.componentInstance.colaborador = colaborador;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterColaboradores();
                }
            })
            .catch((err) => err);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
