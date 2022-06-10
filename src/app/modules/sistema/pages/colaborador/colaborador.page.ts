import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ColaboradorDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-colaborador',
    templateUrl: './colaborador.page.html',
    styleUrls: ['./colaborador.page.scss']
})
export class ColaboradorPage implements OnInit {
    colaboradores: Colaborador[] = [];
    colaboradorDataViewConfig = ColaboradorDataViewConfig;
    nomeEmpresa = '';

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
    }

    criarColaborador(): void {

    }

}
