export interface PesquisaM1Inserir {
    idEmpresa: string;
    idColaborador: string;
    valores: ValorM1[];
}

export interface AcaoM1 {
    acao: string;
    idResponsavel: string;
    idEnvolvido: string;
}

export interface ValorM1 {
    idValor: string;
    acoes: AcaoM1[];
}