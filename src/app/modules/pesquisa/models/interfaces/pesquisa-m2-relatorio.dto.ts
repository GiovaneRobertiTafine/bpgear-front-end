export interface PesquisaM2Relatorio {
    nomeColaborador: string;
    valores: ValorPesquisaM2Relatorio[];
}

export interface ValorPesquisaM2Relatorio {
    nomeValor: string;
    bensServicos: BemServicoPesquisaM2Relatorio[];
}

export interface BemServicoPesquisaM2Relatorio {
    nomeBemServico: string;
    nota: string;
}