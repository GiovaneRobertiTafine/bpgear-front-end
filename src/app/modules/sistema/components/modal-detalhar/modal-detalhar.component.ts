import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataColuna, DataViewConfig } from 'src/app/shared/models/data-view-config.model';
import { InjectorPipe } from 'src/app/shared/pipes/injector.pipe';
import { Cliente } from '../../models/interfaces/cliente.interface';

@Component({
    selector: 'bpgear-modal-detalhar',
    templateUrl: './modal-detalhar.component.html',
    styleUrls: ['./modal-detalhar.component.scss']
})
export class ModalDetalharComponent implements OnInit {
    cliente: Cliente = null;
    dataViewConfig: DataViewConfig = null;

    constructor(
        public activeModal: NgbActiveModal,
        private dynamicPipe: InjectorPipe
    ) { }

    obterValorPropriedade(obj: any, col: DataColuna): string {
        if (col.mascara) {
            return this.dynamicPipe.transform(
                obj[col.propriedade.join('.')],
                col.mascara.token,
                col.mascara?.arg
            );
        }

        return obj[col.propriedade.join('.')];
    }

    ngOnInit(): void {
    }

}
