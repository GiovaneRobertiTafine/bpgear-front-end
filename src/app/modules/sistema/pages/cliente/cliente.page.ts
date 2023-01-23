import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, merge, startWith, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { PesquisaM3EnviarEmailLista } from 'src/app/modules/pesquisa/models/requests/pesquisa-m3-enviar-email-lista.request';
import { PesquisaM3EnviarEmail } from 'src/app/modules/pesquisa/models/requests/pesquisa-m3-enviar-email.request';
import { PesquisaService } from 'src/app/modules/pesquisa/services/pesquisa.service';
import { Ordenacao } from 'src/app/modules/shared/models/ordenacao.model';
import { Paginacao } from 'src/app/modules/shared/models/paginacao.model';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { ModalAlterarPesquisaComponent } from '../../components/modal-alterar-pesquisa/modal-alterar-pesquisa.component';
import { ModalClienteCriarEmailComponent } from '../../components/modal-cliente-criar-email/modal-cliente-criar-email.component';
import { ModalClienteCriarComponent } from '../../components/modal-cliente-criar/modal-cliente-criar.component';
import { ModalClienteEditarComponent } from '../../components/modal-cliente-editar/modal-cliente-editar.component';
import { ModalDeletarComponent } from '../../components/modal-deletar/modal-deletar.component';
import { ModalDetalharComponent } from '../../components/modal-detalhar/modal-detalhar.component';
import { ClienteDataViewConfig, ClienteDetalharViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Pesquisa } from '../../models/enums/pesquisa.enum';
import { Cliente } from '../../models/interfaces/cliente.interface';
import { ClienteAlterarPesquisaLista } from '../../models/requests/cliente-alterar-pesquisa-lista.request';
import { ClienteService } from '../../services/cliente.service';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-cliente',
    templateUrl: './cliente.page.html',
    styleUrls: ['./cliente.page.scss']
})
export class ClientePage implements OnInit, OnDestroy, AfterViewInit {
    clienteDataViewConfig = ClienteDataViewConfig;
    clientes: Cliente[] = [];
    pesquisa = Pesquisa;
    @ViewChild('colAlterarPesquisa') colAlterarPesquisa;
    @ViewChild('colEnviarPesquisa') colEnviarPesquisa;
    @ViewChild('colSelecionarTodos') colSelecionarTodos;
    @ViewChild('colSelecionarItem') colSelecionarItem;
    faEnvelope = faEnvelope;

    selecaoCliente: string[] = [];

    @ViewChild('table') table: any;

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private mercadoService: MercadoService,
        private empresaService: EmpresaService,
        private clienteService: ClienteService,
        private pesquisaService: PesquisaService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.clienteDataViewConfig.colunas[this.clienteDataViewConfig.colunas.length - 2].template = this.colAlterarPesquisa;
        this.clienteDataViewConfig.colunas[this.clienteDataViewConfig.colunas.length - 1].template = this.colEnviarPesquisa;
        setTimeout(() => { this.clienteDataViewConfig.colunas[0].templateTitulo = this.colSelecionarTodos; });
        this.clienteDataViewConfig.colunas[0].template = this.colSelecionarItem;

        merge(this.table.paginacaoChange, this.table.ordenacaoChange)
            .pipe(
                startWith({}),
                tap(() => {
                    this.obterClientes(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe(response => response);
    }

    obterClientes(paginacao?: Paginacao, ordenacao?: Ordenacao): void {
        this.spinnerService.show();
        this.clienteService.obterClientes(this.empresaService.getEmpresa().value.id, paginacao, ordenacao)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }
                    (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = false;
                    this.clientes = response.data;
                    this.selecaoCliente = [];
                }
            );
    }

    criarCliente(): void {
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
                    const modalRef = this.modalService.open(ModalClienteCriarComponent, { size: 'md' });
                    modalRef.componentInstance.mercados = response.data;

                    modalRef.result
                        .then(
                            (res) => {
                                if (typeof (res) === "string") this.router.navigateByUrl(res);
                                if (res) this.obterClientes(
                                    this.table.paginacao,
                                    this.table.ordenacao
                                );
                            }
                        )
                        .catch((err) => err);
                }
            );
    }

    deletarCliente(cliente: Cliente): void {
        const modalRef = this.modalService.open(ModalDeletarComponent, { size: 'md' });
        modalRef.componentInstance.cliente = cliente;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterClientes(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    detalharCliente(cliente: Cliente): void {
        const modalRef = this.modalService.open(ModalDetalharComponent, { size: 'md' });
        modalRef.componentInstance.cliente = cliente;
        modalRef.componentInstance.dataViewConfig = ClienteDetalharViewConfig;
    }

    alterarPesquisa(cliente: Cliente): void {
        const modalRef = this.modalService.open(ModalAlterarPesquisaComponent, { size: 'md' });
        modalRef.componentInstance.cliente = cliente;
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterClientes(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                }
            })
            .catch((err) => err);
    }

    editarCliente(cliente: Cliente): void {
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
                    const modalRef = this.modalService.open(ModalClienteEditarComponent, { size: 'md' });
                    modalRef.componentInstance.cliente = cliente;
                    modalRef.componentInstance.mercados = response.data;

                    modalRef.result
                        .then((res) => {
                            if (res) {
                                this.obterClientes(
                                    this.table.paginacao,
                                    this.table.ordenacao
                                );
                            }
                        })
                        .catch((err) => err);
                }
            );
    }

    enviarEmailPesquisaM1(cliente: Cliente): void {
        if (+Pesquisa[cliente.pesquisa] === Pesquisa.DESATIVADA)
            return this.toastService.warning("Não é possível enviar e-mail de pesquisa, com pesquisa desativada.");
        this.spinnerService.show();
        const request: PesquisaM3EnviarEmail = { idCliente: cliente.id };
        this.pesquisaService.enviarEmailM3(request)
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

    openModal(content, size = 'xl') {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: size });
    }

    selecionarCliente(id?: string): void {
        if (id) {
            const index = this.selecaoCliente.findIndex((v) => v === id);
            if (index === -1) {
                this.selecaoCliente.push(id);
                if (this.clientes.length === this.selecaoCliente.length) {
                    (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = true;
                }
            } else {
                this.selecaoCliente.splice(index, 1);
                (document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked = false;
            }
        } else {
            if ((document.getElementById('inputSelecionarTodos') as HTMLInputElement).checked) {
                this.clientes.forEach((v) => {
                    if (!this.selecaoCliente.includes(v.id)) {
                        this.selecaoCliente.push(v.id);
                        (document.getElementById(v.id) as HTMLInputElement).checked = true;
                    }
                });
            } else {
                this.selecaoCliente.forEach((v) => {
                    (document.getElementById(v) as HTMLInputElement).checked = false;
                });
                this.selecaoCliente = [];
            }
        }
    }

    ativarDesativarPesquisaSelecaoCliente(pesquisa: Pesquisa): void {
        if (!this.selecaoCliente.length) return this.toastService.warning("Selecione pelo menos um cliente.");
        this.spinnerService.show();
        const request: ClienteAlterarPesquisaLista = { pesquisa: pesquisa, listaIdCliente: this.selecaoCliente };
        this.clienteService.alterarPesquisaClienteLista(request)
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
                    this.obterClientes(
                        this.table.paginacao,
                        this.table.ordenacao
                    );
                    this.modalService.dismissAll();
                }
            );
    }

    enviarPesquisaSelecaoCliente(): void {
        if (!this.selecaoCliente.length) return this.toastService.warning("Selecione pelo menos um cliente.");
        this.spinnerService.show();
        const request: PesquisaM3EnviarEmailLista = { listaIdCliente: this.selecaoCliente };
        this.pesquisaService.enviarEmailM3Lista(request)
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
                    this.obterClientes(
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
