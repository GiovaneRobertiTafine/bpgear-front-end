import { Component, OnInit } from '@angular/core';
import { DataViewConfig } from 'src/app/shared/models/data-view-config.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DataViewConfigEmpresa } from '../../models/constants/empresa-data-view-config.constant';
import { Empresa } from '../../models/interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-empresa',
    templateUrl: './empresa.page.html',
    styleUrls: ['./empresa.page.scss']
})
export class EmpresaPage implements OnInit {
    empresas: Empresa[] = [];
    dataViewConfigEmpresa = DataViewConfigEmpresa;

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
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

}
