export interface PesquisaM3Relatorio {
    nomeCliente: string;
    nomeMercado: string;
    valores: ValorPesquisaM3Relatorio[];
}

export interface ValorPesquisaM3Relatorio {
    nomeValor: string;
    observacao: string;
    bensServicos: BemServicoPesquisaM3Relatorio[];
}

export interface BemServicoPesquisaM3Relatorio {
    nomeBemServico: string;
    nota: string;
}