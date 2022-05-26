import { TemplateRef } from "@angular/core";

export interface DataViewConfig {
    colunas: DataColuna[];
    paginacao?: boolean;
    colunasAcao?: ColunasAcao;
}

interface DataColuna {
    titulo: string | TemplateRef<any>;
    propriedade: string[] | TemplateRef<any>;
    mascara?: Mascara;
    ordenacao?: DirecaoOrdenacao;
}

interface Mascara {
    token: Object;
    args?: string[];
}

interface ColunasAcao {
    detalhar?: boolean;
    editar?: boolean;
    excluir?: boolean;
}

enum DirecaoOrdenacao {
    PADRAO,
    ASC,
    DESC
}

