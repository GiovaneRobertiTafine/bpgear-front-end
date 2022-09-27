import { Pesquisa } from "../enums/pesquisa.enum";

export interface Colaborador {
    id: string;
    // usuario: string;
    nome: string;
    email: string;
    // senha: string;
    pesquisa: Pesquisa;
}