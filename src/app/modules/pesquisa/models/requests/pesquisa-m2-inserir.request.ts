export interface PesquisaM2Inserir {
    idEmpresa: string;
    idColaborador: string;
    valores: ValorM2[];
}

export interface ValorM2 {
    idValor: string;
    notas: NotaM2[];
}

export interface NotaM2 {
    nota: string;
    idBemServico: string;
}