import { TemplateRef } from "@angular/core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { NestedKeyOf } from "../utils/script.extension";
import { Paginacao } from "./paginacao.model";

export interface DataViewConfig<T> {
    colunas: DataColuna<T>[];
    classes?: string[];
    paginacao?: Paginacao;
    colunasAcao?: ColunasAcao;
}

export interface DataColuna<T> {
    titulo: string;
    propriedade: T[];
    eventCallBack?: boolean;
    template?: TemplateRef<any>;
    mascara?: Mascara;
    ordenacao?: DirecaoOrdenacao;
    iconTituloFA?: IconProp;
    tooltipTitulo?: string;
}

interface Mascara {
    token: Object;
    arg?: string;
}

interface ColunasAcao {
    detalhar?: boolean;
    editar?: boolean;
    deletar?: boolean;
}

export enum DirecaoOrdenacao {
    PADRAO,
    ASC,
    DESC
}

