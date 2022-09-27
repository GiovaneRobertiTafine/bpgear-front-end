import { Pesquisa } from "../enums/pesquisa.enum";
import { Mercado } from "./mercado.interface";

export interface Cliente {
    id: string;
    // usuario: string;
    nome: string;
    razaoSocial: string;
    cnpj: string;
    responsavel: string;
    telefone: string;
    email: string;
    pesquisa: Pesquisa;
    mercado: Mercado;
}