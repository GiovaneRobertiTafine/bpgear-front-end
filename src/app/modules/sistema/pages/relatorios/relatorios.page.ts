import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PesquisaM1Relatorio } from 'src/app/modules/pesquisa/models/interfaces/pesquisa-m1-relatorio.dto';
import { PesquisaM2Relatorio } from 'src/app/modules/pesquisa/models/interfaces/pesquisa-m2-relatorio.dto';
import { PesquisaM3Relatorio } from 'src/app/modules/pesquisa/models/interfaces/pesquisa-m3-relatorio.dto';
import { PesquisaService } from 'src/app/modules/pesquisa/services/pesquisa.service';
import { SpinnerService } from 'src/app/modules/shared/services/spinner.service';
import { ToastService } from 'src/app/modules/shared/services/toast.service';
import { RelatorioM1DataViewConfig, RelatorioM2DataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-relatorios',
    templateUrl: './relatorios.page.html',
    styleUrls: ['./relatorios.page.scss']
})
export class RelatoriosPage implements OnInit, OnDestroy {
    tipoRelatorio: 'm1' | 'm2' | 'm3' | null = null;
    relatorioM1DataViewConfig = RelatorioM1DataViewConfig;
    relatorioM2DataViewConfig = RelatorioM2DataViewConfig;
    relatorioM1: PesquisaM1Relatorio[] = [];
    relatorioM2: PesquisaM2Relatorio[] = [];
    relatorioM3: PesquisaM3Relatorio[] = [];

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private pesquisaService: PesquisaService,
        private empresaService: EmpresaService,
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    obterRelatorioM1(): void {
        this.relatorioM1 = [];
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

    obterRelatorioM2(): void {
        this.relatorioM2 = [];
        this.spinnerService.show();
        this.pesquisaService.obterRelatorioM2(this.empresaService.getEmpresa().value.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response) => {
                this.spinnerService.hide();
                if (response.resultStatus.code !== 200) {
                    this.toastService.error(response.resultStatus.message);
                    return;
                }

                this.relatorioM2 = response.data;
            });
    }

    obterRelatorioM3(): void {
        this.relatorioM3 = [];
        this.spinnerService.show();
        this.pesquisaService.obterRelatorioM3(this.empresaService.getEmpresa().value.id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((response) => {
                this.spinnerService.hide();
                if (response.resultStatus.code !== 200) {
                    this.toastService.error(response.resultStatus.message);
                    return;
                }

                this.relatorioM3 = response.data;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
