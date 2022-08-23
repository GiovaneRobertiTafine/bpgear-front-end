export interface Cliente {
    id?: string;
    ususario: string;
    nomeCliente: string;
    razaoSocial: string;
    cnpj: string;
    responsavel: string;
    telefone: string;
    email: string;
    senha?: string;
    pesquisaAtiva: boolean;
    idMercado: string;
}