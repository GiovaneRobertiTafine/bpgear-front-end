import { Pesquisa } from "../enums/pesquisa.enum";

export interface ColaboradorAlterarPesquisaLista {
    listaIdColaborador: string[];
    pesquisa: Pesquisa;
}