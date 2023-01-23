import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, startWith, Subject, switchMap, takeUntil, merge, tap } from 'rxjs';
import { PesquisaM1EnviarEmailLista } from 'src/app/modules/pesquisa/models/requests/pesquisa-m1-enviar-email-lista.request';
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
import { ColaboradorAlterarPesquisaLista } from '../../models/requests/colaborador-alterar-pesquisa-lista.request';
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
    pesquisa = Pesquisa;
    @ViewChild('colAlterarPesquisa') colAlterarPesquisa;
    @ViewChild('colEnviarPesquisa') colEnviarPesquisa;
    @ViewChild('modalConfirmarEnvioEmail') modalConfirmarEnvioEmail;
    @ViewChild('colSelecionarTodos') colSelecionarTodos;
    @ViewChild('colSelecionarItem') colSelecionarItem;

    selecaoColaborador: string[] = [];

    @ViewChild('table') table: TableComponent;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        public modalService: NgbModal,
        private colaboradorService: ColaboradorService,
        private pesquisaService: PesquisaService
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.colaboradorDataViewConfig.colunas[this.colaboradorDataViewConfig.colunas.length - 2].template = this.colAlterarPesquisa;
        this.colaboradorDataViewConfig.colunas[this.colaboradorDataViewConfig.colunas.length - 1].template = this.colEnviarPesquisa;
        setTimeout(() => { this.colaboradorDataViewConfig.colunas[0].templateTitulo = this.colSelecionarTodos; });
        this.colaboradorDataViewConfig.colunas[0].template = this.colSelecionarItem;

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
                    (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = false;
                    this.colaboradores = response.data;
                    this.selecaoColaborador = [];
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

    selecionarColaborador(id?: string): void {
        if (id) {
            const index = this.selecaoColaborador.findIndex((v) => v === id);
            if (index === -1) {
                this.selecaoColaborador.push(id);
                if (this.colaboradores.length === this.selecaoColaborador.length) {
                    (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = true;
                }
            } else {
                this.selecaoColaborador.splice(index, 1);
                (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = false;
            }
        } else {
            if ((document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked) {
                this.colaboradores.forEach((v) => {
                    if (!this.selecaoColaborador.includes(v.id)) {
                        this.selecaoColaborador.push(v.id);
                        (document.getElementById(v.id) as HTMLInputElement).checked = true;
                    }
                });
            } else {
                this.selecaoColaborador.forEach((v) => {
                    (document.getElementById(v) as HTMLInputElement).checked = false;
                });
                this.selecaoColaborador = [];
            }
        }
    }

    ativarDesativarPesquisaSelecaoCliente(pesquisa: Pesquisa): void {
        if (!this.selecaoColaborador.length) return this.toastService.warning("Selecione pelo menos um colaborador.");
        this.spinnerService.show();
        const request: ColaboradorAlterarPesquisaLista = { pesquisa: pesquisa, listaIdColaborador: this.selecaoColaborador };
        this.colaboradorService.alterarPesquisaColaboradorLista(request)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.toastService.success(response.resultStatus.message);
                    (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = false;
                    this.obterColaboradores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                    this.modalService.dismissAll();
                }
            );
    }

    enviarPesquisaSelecaoColaborador(): void {
        if (!this.selecaoColaborador.length) return this.toastService.warning("Selecione pelo menos um colaborador.");
        this.spinnerService.show();
        const request: PesquisaM1EnviarEmailLista = { listaIdColaborador: this.selecaoColaborador };
        this.pesquisaService.enviarEmailM1Lista(request)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();

                    if (response.resultStatus.code !== 200 &&
                        response.resultStatus.code !== 207) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    if (response.resultStatus.code === 207) {
                        this.toastService.warning(response.resultStatus.message, 10000);
                    } else {
                        this.toastService.success(response.resultStatus.message);
                    }

                    (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = false;
                    this.obterColaboradores(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                    this.modalService.dismissAll();
                }
            );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
