import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type } from '@angular/core';
import { InjectorPipe } from '../../pipes/injector.pipe';
import { DataColuna, DataViewConfig, DirecaoOrdenacao } from '../../models/data-view-config.model';
import { faArrowDown, faArrowsUpDown, faArrowUp, faInfoCircle, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getNestedValue } from '../../utils/script.extension';
import { Paginacao } from '../../models/paginacao.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'bpgear-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    iconEditar = faPenToSquare;
    iconDeletar = faTrashCan;
    iconDetalhar = faInfoCircle;

    iconArrowUp = faArrowUp;
    iconArrowDown = faArrowDown;
    iconArrowsUpDown = faArrowsUpDown;

    paginacao: Paginacao;
    @Input() colecaoTamanho: number = 0;

    $paginacao: Observable<Paginacao>;

    ordenacaoTemplate: { [index: string]: DirecaoOrdenacao; };
    ordenacao: { [index: string]: string; } = {};
    direcaoOrdenacao = DirecaoOrdenacao;

    @Input() dataViewConfig: DataViewConfig<string>;
    @Input() data: any[];

    @Output() deletarItemEvent = new EventEmitter<any>();
    @Output() editarItemEvent = new EventEmitter<any>();
    @Output() detalharItemEvent = new EventEmitter<any>();
    @Output() eventCallBack = new EventEmitter<any>();
    @Output() paginacaoChange = new EventEmitter<Paginacao>();
    @Output() ordenacaoChange = new EventEmitter<{ [index: string]: DirecaoOrdenacao; }>();

    constructor(private dynamicPipe: InjectorPipe) {
    }

    ngOnInit(): void {
        this.paginacao = Object.assign({}, this.dataViewConfig?.paginacao);
        this.dataViewConfig.colunas.forEach((v, i) => {
            if (v.ordenacao && i === 0) {
                this.ordenacaoTemplate = { ...this.ordenacaoTemplate, [v.propriedade.join('.')]: v.ordenacao };
                this.ordenacao = { [DirecaoOrdenacao[v.ordenacao]]: v.propriedade.join('.') };
            }
            if (v.ordenacao && i !== 0) {
                this.ordenacaoTemplate = { ...this.ordenacaoTemplate, [v.propriedade.join('.')]: DirecaoOrdenacao.PADRAO };
            }
        });
    }

    obterValorPropriedade(obj: {}, col: DataColuna<string>): string {
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

    emitPaginacaoCallBack(): void {
        this.paginacaoChange.emit(this.paginacao);
    }

    ordenarColuna(coluna: string): void {
        switch (this.ordenacaoTemplate[coluna]) {
            case DirecaoOrdenacao.ASC:
                this.ordenacaoTemplate[coluna] = DirecaoOrdenacao.DESC;
                this.ordenacao = { 'desc': coluna };
                this.ordenacaoChange.emit({ [coluna]: DirecaoOrdenacao.DESC });
                break;
            case DirecaoOrdenacao.DESC:
                this.ordenacaoTemplate[coluna] = DirecaoOrdenacao.PADRAO;
                this.ordenacao = null;
                this.ordenacaoChange.emit({ [coluna]: DirecaoOrdenacao.PADRAO });
                break;
            case DirecaoOrdenacao.PADRAO:
                this.ordenacaoTemplate[coluna] = DirecaoOrdenacao.ASC;
                this.ordenacao = { 'asc': coluna };
                this.ordenacaoChange.emit({ [coluna]: DirecaoOrdenacao.ASC });
                break;

            default:
                break;
        }
    }

}
