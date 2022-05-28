import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DataViewConfig } from '../../models/data-view-config.model';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'bpgear-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    iconEditar = faPenToSquare;
    iconExcluir = faTrashCan;

    @Input() dataViewConfig: DataViewConfig;
    @Input() data: any[];
    constructor() { }

    ngOnInit(): void {
    }

    obterValorPropriedade(obj: any, prop: string[]): string {
        return obj[prop.join('.')];
    }

}
