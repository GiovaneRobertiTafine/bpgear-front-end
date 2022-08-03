import { MaskPipe } from 'ngx-mask';
import { DataViewConfig } from "src/app/shared/models/data-view-config.model";
import { TelefonePipe } from 'src/app/shared/pipes/telefone.pipe';
import { TransformValuePipe } from '../../pipe/transform-value.pipe';

export const EmpresaDataViewConfig: DataViewConfig = {
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

export const ColaboradorDataViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"]
        },
        {
            titulo: "Usuário",
            propriedade: ["usuario"]
        },
        {
            titulo: "E-mail",
            propriedade: ["email"]
        },
        {
            titulo: "Pesquisa",
            propriedade: ["pesquisaAtiva"],
            mascara: {
                token: TransformValuePipe,
                arg: 'colaborador-tabela-pesquisa'
            }
        }
    ],
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const ClienteDataViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nomeCompleto"]
        },
        {
            titulo: "Usuário",
            propriedade: ["usuario"]
        },
        {
            titulo: "E-mail",
            propriedade: ["email"]
        },
        {
            titulo: "Pesquisa",
            propriedade: ["pesquisaAtiva"],
            mascara: {
                token: TransformValuePipe,
                arg: 'colaborador-tabela-pesquisa'
            }
        }
    ],
    colunasAcao: {
        editar: true,
        deletar: true
    }
};