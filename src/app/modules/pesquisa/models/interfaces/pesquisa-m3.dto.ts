import { BemServico } from "src/app/modules/sistema/models/interfaces/bem-servico.interface";
import { Cliente } from "src/app/modules/sistema/models/interfaces/cliente.interface";
import { Empresa } from "src/app/modules/sistema/models/interfaces/empresa.interface";
import { Valor } from "src/app/modules/sistema/models/interfaces/valor.inteface";

export interface PesquisaM3 {
    empresa: Empresa,
    cliente: Cliente,
    valor: Valor[],
    bemServico: BemServico[];
}