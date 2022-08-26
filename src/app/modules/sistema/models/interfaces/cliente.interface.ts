export interface Cliente {
    id?: string;
    usuario: string;
    nomeCliente: string;
    razaoSocial: string;
    cnpj: string;
    responsavel: string;
    telefone: string;
    email: string;
    pesquisaAtiva: boolean;
    idMercado: string;
}