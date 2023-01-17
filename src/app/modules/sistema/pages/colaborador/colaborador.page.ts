import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, startWith, Subject, switchMap, takeUntil, merge, tap } from 'rxjs';
import { PesquisaM1EnviarEmail } from 'src/app/modules/pesquisa/models/requests/pesquisa-m1-enviar-email.request';
import { PesquisaService } from 'src/app/modules/pesquisa/services/pesquisa.service';
import { TableComponent } from 'src/app/modules/shared/components/table/table.component';
import { Ordenacao } from 'src/app/modules/shared/models/ordenacao.model';
import { Paginacao } from 'src/app/modules/shared/models/paginacao.model';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { ModalAlterarPesquisaComponent } from '../../components/modal-alterar-pesquisa/modal-alterar-pesquisa.component';
import { ModalColaboradorCriarEmailComponent } from '../../components/modal-colaborador-criar-email/modal-colaborador-criar-email.component';
import { ModalColaboradorCriarComponent } from '../../components/modal-colaborador-criar/modal-colaborador-criar.component';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
import { ColaboradorDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Pesquisa } from '../../models/enums/pesquisa.enum';
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
    faEnvelope = faEnvelope;
    colaboradorConfirmarEnviarEmail: Colaborador = null;
    @ViewChild('colAlterarPesquisa') colAlterarPesquisa;
    @ViewChild('colEnviarPesquisa') colEnviarPesquisa;
    @ViewChild('modalConfirmarEnvioEmail') modalConfirmarEnvioEmail;

    @ViewChild('table') table: TableComponent;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private colaboradorService: ColaboradorService,
        private pesquisaService: PesquisaService
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.colaboradorDataViewConfig.colunas[this.colaboradorDataViewConfig.colunas.length - 2].template = this.colAlterarPesquisa;
        this.colaboradorDataViewConfig.colunas[this.colaboradorDataViewConfig.colunas.length - 1].template = this.colEnviarPesquisa;

        merge(this.table.paginacaoChange, this.table.ordenacaoChange)
            .pipe(
                startWith({}),
                tap(() => {
                    this.obterColaboradores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(response => response);
    }

    obterColaboradores(paginacao?: Paginacao, ordenacao?: Ordenacao): void {
        this.spinnerService.show();
        this.colaboradorService.obterColaboradores(this.empresaService.getEmpresa().value.id, paginacao, ordenacao)
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
                    if (res) this.obterColaboradores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
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
                    this.obterColaboradores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
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
                    this.obterColaboradores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    enviarEmailPesquisaM1(colaborador: Colaborador): void {
        if (+Pesquisa[colaborador.pesquisa] === Pesquisa.DESATIVADA)
            return this.toastService.warning("Não é possível enviar e-mail de pesquisa, com pesquisa desativada.");
        this.colaboradorConfirmarEnviarEmail = colaborador;
        this.modalService.open(this.modalConfirmarEnvioEmail, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
            .result.then(
                (response) => {
                    if (response) {
                        this.spinnerService.show();
                        const request: PesquisaM1EnviarEmail = { idColaborador: this.colaboradorConfirmarEnviarEmail.id };
                        this.pesquisaService.enviarEmailM1(request)
                            .subscribe(
                                (response) => {
                                    this.spinnerService.hide();
                                    if (response.resultStatus.code !== 200) {
                                        this.toastService.error(response.resultStatus.message);
                                        return;
                                    }

                                    this.toastService.success(response.resultStatus.message);
                                    this.modalService.dismissAll();
                                }
                            );
                    }
                }
            );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
