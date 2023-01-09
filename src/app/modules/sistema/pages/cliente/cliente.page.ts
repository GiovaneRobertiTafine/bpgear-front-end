import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { PesquisaM3EnviarEmail } from 'src/app/modules/pesquisa/models/requests/pesquisa-m3-enviar-email.request';
import { PesquisaService } from 'src/app/modules/pesquisa/services/pesquisa.service';
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
import { ClienteService } from '../../services/cliente.service';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-cliente',
    templateUrl: './cliente.page.html',
    styleUrls: ['./cliente.page.scss']
})
export class ClientePage implements OnInit, AfterViewInit {
    clienteDataViewConfig = ClienteDataViewConfig;
    clientes: Cliente[] = [];
    pesquisa = Pesquisa;
    @ViewChild('colAlterarPesquisa') colAlterarPesquisa;
    @ViewChild('colEnviarPesquisa') colEnviarPesquisa;
    faEnvelope = faEnvelope;

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
        this.obterClientes();
    }

    ngAfterViewInit(): void {
        this.clienteDataViewConfig.colunas[this.clienteDataViewConfig.colunas.length - 2].template = this.colAlterarPesquisa;
        this.clienteDataViewConfig.colunas[this.clienteDataViewConfig.colunas.length - 1].template = this.colEnviarPesquisa;
    }

    obterClientes(): void {
        this.spinnerService.show();
        this.clienteService.obterClientes(this.empresaService.getEmpresa().value.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.clientes = response.data;
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
                                if (res) this.obterClientes();
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
                    this.obterClientes();
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
                    this.obterClientes();
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
                                this.obterClientes();
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

}
