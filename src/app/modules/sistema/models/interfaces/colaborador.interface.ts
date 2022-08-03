export interface Colaborador {
    id?: string;
    usuario: string;
    nome: string;
    email: string;
    senha?: string;
    pesquisaAtiva: boolean;
}