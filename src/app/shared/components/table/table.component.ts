import { Component, Input, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { DataViewConfig, DataColuna } from '../../models/data-view-config.model';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { InjectorPipe } from '../../pipes/injector.pipe';

@Component({
    selector: 'bpgear-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    iconEditar = faPenToSquare;
    iconDeletar = faTrashCan;

    @Input() dataViewConfig: DataViewConfig;
    @Input() data: any[];

    @Output() deletarItemEvent = new EventEmitter<any>();
    @Output() editarItemEvent = new EventEmitter<any>();
    @Output() eventCallBack = new EventEmitter<any>();

    constructor(private dynamicPipe: InjectorPipe) { }

    ngOnInit(): void {
    }

    obterValorPropriedade(obj: any, col: DataColuna): string {
        if (col.mascara) {
            return this.dynamicPipe.transform(
                obj[col.propriedade.join('.')],
                col.mascara.token,
                col.mascara?.arg
            );
        }
        if (col.propriedade.length === 0) {
            return obj;
        }
        return obj[col.propriedade.join('.')];
    }

    deletarItem(item: any): void {
        this.deletarItemEvent.emit(item);
    }

    editarItem(item: any): void {
        this.editarItemEvent.emit(item);
    }

    obterClassesTabela(): string {
        return this.dataViewConfig.classes.join(' ');
    }

    emitEventCallBack(obj: any): void {
        this.eventCallBack.emit(obj);
    }

}
