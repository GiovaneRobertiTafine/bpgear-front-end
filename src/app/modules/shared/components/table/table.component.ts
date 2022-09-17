import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InjectorPipe } from '../../pipes/injector.pipe';
import { DataColuna, DataViewConfig } from '../../models/data-view-config.model';
import { faInfoCircle, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getNestedValue } from '../../utils/script.extension';

@Component({
    selector: 'bpgear-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    iconEditar = faPenToSquare;
    iconDeletar = faTrashCan;
    iconDetalhar = faInfoCircle;

    @Input() dataViewConfig: DataViewConfig;
    @Input() data: any[];

    @Output() deletarItemEvent = new EventEmitter<any>();
    @Output() editarItemEvent = new EventEmitter<any>();
    @Output() detalharItemEvent = new EventEmitter<any>();
    @Output() eventCallBack = new EventEmitter<any>();

    constructor(private dynamicPipe: InjectorPipe) {
    }

    ngOnInit(): void {

    }

    obterValorPropriedade(obj: {}, col: DataColuna): string {
        let result = getNestedValue(obj, col.propriedade);

        if (col.mascara) {
            result = this.dynamicPipe.transform(
                result,
                col.mascara.token,
                col.mascara?.arg
            );
        }

        return result;
    }

    deletarItem(item: any): void {
        this.deletarItemEvent.emit(item);
    }

    editarItem(item: any): void {
        this.editarItemEvent.emit(item);
    }

    detalharItem(item: any): void {
        this.detalharItemEvent.emit(item);
    }

    obterClassesTabela(): string {
        return this.dataViewConfig.classes.join(' ');
    }

    emitEventCallBack(obj: any): void {
        this.eventCallBack.emit(obj);
    }

}
