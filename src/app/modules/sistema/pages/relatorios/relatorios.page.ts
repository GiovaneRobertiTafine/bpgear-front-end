import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PesquisaM1Relatorio } from 'src/app/modules/pesquisa/models/interfaces/pesquisa-m1-relatorio.dto';
import { PesquisaService } from 'src/app/modules/pesquisa/services/pesquisa.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { RelatorioM1DataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-relatorios',
    templateUrl: './relatorios.page.html',
    styleUrls: ['./relatorios.page.scss']
})
export class RelatoriosPage implements OnInit {
    tipoRelatorio: 'm1' | 'm2' | 'm3' | null = null;
    relatorioM1DataViewConfig = RelatorioM1DataViewConfig;
    relatorioM1: PesquisaM1Relatorio[] = [];

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private pesquisaService: PesquisaService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
    }

    acessarRelatorio(tipoRelatorio: string): void {
        console.log(tipoRelatorio);
    }

    obterRelatorioM1(): void {
        this.spinnerService.show();
        this.pesquisaService.obterRelatorioM1(this.empresaService.getEmpresa().value.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response) => {
                this.spinnerService.hide();
                if (response.resultStatus.code !== 200) {
                    this.toastService.error(response.resultStatus.message);
                    return;
                }

                this.relatorioM1 = response.data;
            });
    }

}
