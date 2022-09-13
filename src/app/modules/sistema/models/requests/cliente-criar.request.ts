import { Cliente } from "../interfaces/cliente.interface";

export interface ClienteCriar extends Omit<Cliente, "id" | "mercado"> {
    idEmpresa: string;
    senha: string;
    confirmarSenha: string;
    idMercado: string;
}