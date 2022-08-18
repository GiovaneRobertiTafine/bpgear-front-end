import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ModalClienteCriarComponent } from '../../components/modal-cliente-criar/modal-cliente-criar.component';
import { ClienteDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { EmpresaService } from '../../services/empresa.service';
import { MercadoService } from '../../services/mercado.service';

@Component({
    selector: 'bpgear-cliente',
    templateUrl: './cliente.page.html',
    styleUrls: ['./cliente.page.scss']
})
export class ClientePage implements OnInit {
    clienteDataViewConfig = ClienteDataViewConfig;

    constructor(
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private mercadoService: MercadoService,
        private empresaService: EmpresaService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    criarCliente(): void {
        this.spinnerService.show();
        this.mercadoService.obterMercados(this.empresaService.getEmpresa().value.id)
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
                                if (typeof (res) === "string") {
                                    this.router.navigateByUrl(res);
                                }
                            }
                        )
                        .catch((err) => err);
                }
            );
    }

}
