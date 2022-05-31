import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataColuna, DataViewConfig } from 'src/app/shared/models/data-view-config.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ModalEmpresaCriarComponent } from '../../components/modal-empresa-criar/modal-empresa-criar.component';
import { DataViewConfigEmpresa } from '../../models/constants/empresa-data-view-config.constant';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-empresa',
    templateUrl: './empresa.page.html',
    styleUrls: ['./empresa.page.scss']
})
export class EmpresaPage implements OnInit, AfterViewInit {
    empresas: Empresa[] = [];
    dataViewConfigEmpresa = DataViewConfigEmpresa;
    dataDanger = "";
    @ViewChild('colTest') colTest;
    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.obterEmpresas();
    }

    obterEmpresas(): void {
        this.spinnerService.show();
        this.empresaService.obterEmpresa()
            .subscribe((response) => {
                this.spinnerService.hide();
                if (response.resultStatus.code !== 200) {
                    this.toastService.error(response.resultStatus.message);
                    return;
                }

                this.empresas = response.data;
            });
    }

    ngAfterViewInit(): void {
        // this.dataViewConfigEmpresa.colunas[2].template = this.colTest;

    }

    menorQue(valor: number): boolean {
        return valor < 11212312312 ? true : false;
    }

    criarEmpresa(): void {
        const modalRef = this.modalService.open(ModalEmpresaCriarComponent, { size: 'lg' });
        modalRef.result
            .then((res) => {
                if (res) {
                    this.obterEmpresas();
                }
            })
            .catch((err) => err);
    }

}
