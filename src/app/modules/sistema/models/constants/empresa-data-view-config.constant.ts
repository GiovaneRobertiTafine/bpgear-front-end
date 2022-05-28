import { DataViewConfig } from "src/app/shared/models/data-view-config.model";

export const DataViewConfigEmpresa: DataViewConfig = {
    colunas: [
        {
            titulo: "Empresa",
            propriedade: ["nomeEmpresa"]
        },
        {
            titulo: "Razão Social",
            propriedade: ["razaoSocial"]
        },
        // {
        //     titulo: "New Column",
        //     propriedade: ["cnpj"]
        // },
        {
            titulo: "CNPJ",
            propriedade: ["cnpj"]
        },
        {
            titulo: "Responsável",
            propriedade: ["responsavel"]
        },
        {
            titulo: "Contato",
            propriedade: ["telefone"]
        }
    ],
    colunasAcao: {
        editar: true,
        excluir: true
    }
};