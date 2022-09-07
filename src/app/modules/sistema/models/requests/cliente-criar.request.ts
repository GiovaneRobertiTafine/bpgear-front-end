import { Cliente } from "../interfaces/cliente.interface";

export interface ClienteCriar extends Cliente {
    idEmpresa: string;
    senha: string;
    confirmarSenha: string;
}