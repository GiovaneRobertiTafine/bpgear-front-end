export interface PesquisaM3Inserir {
    idEmpresa: string;
    idCliente: string;
    valores: ValorM3[];
}

export interface ValorM3 {
    idValor: string;
    observacao: string;
    notas: NotaM3[];
}

export interface NotaM3 {
    nota: string;
    idBemServico: string;
}