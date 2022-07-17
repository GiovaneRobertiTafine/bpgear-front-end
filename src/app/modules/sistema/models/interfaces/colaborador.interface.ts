export interface Colaborador {
    id?: string;
    usuario: string;
    nomeCompleto: string;
    email: string;
    senha?: string;
    pesquisaAtiva: boolean;
}