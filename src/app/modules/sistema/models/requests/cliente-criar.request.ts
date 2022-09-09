import { Cliente } from "../interfaces/cliente.interface";

export interface ClienteCriar extends Omit<Cliente, "id"> {
    idEmpresa: string;
    senha: string;
    confirmarSenha: string;
}