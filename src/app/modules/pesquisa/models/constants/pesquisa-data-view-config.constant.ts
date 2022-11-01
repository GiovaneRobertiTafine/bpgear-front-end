import { DataViewConfig } from "src/app/modules/shared/models/data-view-config.model";
import { NestedKeyOf } from "src/app/modules/shared/utils/script.extension";
import { PesquisaM1 } from "../interfaces/pesquisa-m1.dto";

export const EmpresaDataViewConfig: DataViewConfig<NestedKeyOf<PesquisaM1>> = {
    colunas: [
        {
            titulo: "Lista de Valores Percebidos",
            propriedade: ["valor"],
        },
        {
            titulo: "Ações que geram, amplia, estimulam o valor Caracteres (500)",
            propriedade: []
        }
    ]
};