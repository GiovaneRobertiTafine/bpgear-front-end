import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Colaborador } from '../../models/interfaces/colaborador.interface';
import { DeletarColaborador } from '../../models/requests/colaborador-deletar.request';
import { ColaboradorService } from '../../services/colaborador.service';

@Component({
    selector: 'bpgear-modal-colaborador-deletar',
    templateUrl: './modal-colaborador-deletar.component.html',
    styleUrls: ['./modal-colaborador-deletar.component.scss']
})
export class ModalColaboradorDeletarComponent implements OnInit {
    colaborador: Colaborador;
    constructor(
        public activeModal: NgbActiveModal,
        private spinnerService: SpinnerService,
        private toastService: ToastService,
        private colaboradorService: ColaboradorService,
    ) { }

    ngOnInit(): void {
    }

    deletarColaborador(): void {
        const deletarColaborador: DeletarColaborador = { id: this.colaborador.id };
        this.spinnerService.show();
        this.colaboradorService.deletarColaborador(deletarColaborador)
            .subscribe(
                (response) => {
                    this.spinnerService.hide();
                    if (response.resultStatus.code !== 200) {
                        this.toastService.error(response.resultStatus.message);
                        return;
                    }

                    this.toastService.success(response.resultStatus.message);
                    this.activeModal.close(true);
                }
            );
    }

}
