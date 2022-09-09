import { Pesquisa } from "../enums/pesquisa.enum";

export interface ClienteAlterarPesquisa {
    id: string;
    pesquisa: Pesquisa;
}