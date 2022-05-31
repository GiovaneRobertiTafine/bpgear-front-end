import { MaskPipe } from 'ngx-mask';
import { DataViewConfig } from "src/app/shared/models/data-view-config.model";
import { TelefonePipe } from 'src/app/shared/pipes/telefone.pipe';

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
            propriedade: ["cnpj"],
            mascara: { token: MaskPipe, arg: "CPF_CNPJ" }
        },
        {
            titulo: "Responsável",
            propriedade: ["responsavel"]
        },
        {
            titulo: "Contato",
            propriedade: ["telefone"],
            mascara: { token: TelefonePipe }
        }
    ],
    colunasAcao: {
        editar: true,
        excluir: true
    }
};