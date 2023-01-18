import { Pesquisa } from "../enums/pesquisa.enum";

export interface ClienteAlterarPesquisaLista {
    listaIdCliente: string[];
    pesquisa: Pesquisa;
}