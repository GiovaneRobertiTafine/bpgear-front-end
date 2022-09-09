import { Colaborador } from "../interfaces/colaborador.interface";

export interface ColaboradorCriar extends Omit<Colaborador, "id"> {
    idEmpresa: string;
    senha: string;
    confirmarSenha: string;
}