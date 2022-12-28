import { BemServico } from "src/app/modules/sistema/models/interfaces/bem-servico.interface";
import { Colaborador } from "src/app/modules/sistema/models/interfaces/colaborador.interface";
import { Empresa } from "src/app/modules/sistema/models/interfaces/empresa.interface";
import { Valor } from "src/app/modules/sistema/models/interfaces/valor.inteface";

export interface PesquisaM2 {
    empresa: Empresa,
    colaborador: Colaborador,
    valor: Valor[],
    bemServico: BemServico[];
}