import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ModalColaboradorCriarComponent } from '../../components/modal-colaborador-criar/modal-colaborador-criar.component';
import { ColaboradorDataViewConfig } from '../../models/constants/sistema-data-view-config.constant';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { ColaboradorService } from '../../services/colaborador.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
    selector: 'bpgear-colaborador',
    templateUrl: './colaborador.page.html',
    styleUrls: ['./colaborador.page.scss']
})
export class ColaboradorPage implements OnInit {
    colaboradores: Colaborador[] = [];
    colaboradorDataViewConfig = ColaboradorDataViewConfig;
    idEmpresa = '';

    unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private empresaService: EmpresaService,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private colaboradorService: ColaboradorService
    ) {
        this.idEmpresa = this.empresaService.getEmpresa().value.id;
    }

    ngOnInit(): void {
        this.spinnerService.show();
        this.colaboradorService.obterColaborador(this.idEmpresa)
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
        modalRef.componentInstance.idEmpresa = this.idEmpresa;
    }

}
