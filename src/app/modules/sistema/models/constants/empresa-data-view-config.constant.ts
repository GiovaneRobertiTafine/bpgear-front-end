import { MaskPipe } from 'ngx-mask';
import { DataViewConfig } from "src/app/shared/models/data-view-config.model";
import { TelefonePipe } from 'src/app/shared/pipes/telefone.pipe';

export const DataViewConfigEmpresa: DataViewConfig = {
    colunas: [
        {
            titulo: "Empresa",
            propriedade: ["nomeEmpresa"],
            eventCallBack: true
        },
        {
            titulo: "Razão Social",
            propriedade: ["razaoSocial"],
            eventCallBack: true
        },
        // {
        //     titulo: "New Column",
        //     propriedade: ["cnpj"]
        // },
        {
            titulo: "CNPJ",
            propriedade: ["cnpj"],
            mascara: { token: MaskPipe, arg: "CPF_CNPJ" },
            eventCallBack: true
        },
        {
            titulo: "Responsável",
            propriedade: ["responsavel"],
            eventCallBack: true
        },
        {
            titulo: "Contato",
            propriedade: ["telefone"],
            mascara: { token: TelefonePipe },
            eventCallBack: true
        },
        // {
        //     titulo: "Acessar",
        //     propriedade: []
        // }
    ],
    classes: ['table-empresas'],
    colunasAcao: {
        editar: true,
        deletar: true
    },
};