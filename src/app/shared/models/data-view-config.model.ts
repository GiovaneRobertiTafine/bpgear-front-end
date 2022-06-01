import { TemplateRef } from "@angular/core";

export interface DataViewConfig {
    colunas: DataColuna[];
    paginacao?: boolean;
    colunasAcao?: ColunasAcao;
}

export interface DataColuna {
    titulo: string;
    propriedade: string[];
    template?: TemplateRef<any>;
    mascara?: Mascara;
    ordenacao?: DirecaoOrdenacao;
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

enum DirecaoOrdenacao {
    PADRAO,
    ASC,
    DESC
}

