import { Colaborador } from "src/app/modules/sistema/models/interfaces/colaborador.interface";
import { Empresa } from "src/app/modules/sistema/models/interfaces/empresa.interface";
import { Setor } from "src/app/modules/sistema/models/interfaces/setor.interface";
import { Valor } from "src/app/modules/sistema/models/interfaces/valor.inteface";

export interface PesquisaM1 {
    empresa: Empresa,
    colaborador: Colaborador,
    valor: Valor[],
    setor: Setor[];
}
