import { MaskPipe } from 'ngx-mask';
import { DataViewConfig } from 'src/app/modules/shared/models/data-view-config.model';
import { TelefonePipe } from 'src/app/modules/shared/pipes/telefone.pipe';

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
            propriedade: ["pesquisa"],
        },
        {
            titulo: "Ativar/Desativar Pesquisa",
            propriedade: ["pesquisa"],
        }
    ],
    colunasAcao: {
        // editar: true,
        deletar: true
    },
    classes: ['table-colaboradores']
};

export const ClienteDataViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"]
        },
        {
            titulo: "CNPJ",
            propriedade: ["cnpj"],
            mascara: { token: MaskPipe, arg: "CPF_CNPJ" },
        },
        {
            titulo: "Mercado",
            propriedade: ["mercado", "nome"]
        },
        {
            titulo: "Pesquisa",
            propriedade: ["pesquisa"],
        },
        {
            titulo: "Ativar/Desativar Pesquisa",
            propriedade: ["pesquisa"],
        }
    ],
    colunasAcao: {
        editar: true,
        deletar: true,
        detalhar: true
    },
    classes: ['table-clientes']
};

export const ClienteDetalharViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"]
        },
        {
            titulo: "Razao Social",
            propriedade: ["razaoSocial"]
        },
        {
            titulo: "CNPJ",
            propriedade: ["cnpj"],
            mascara: { token: MaskPipe, arg: "CPF_CNPJ" },
        },
        {
            titulo: "Responsável",
            propriedade: ["responsavel"]
        },
        {
            titulo: "E-mail",
            propriedade: ["email"]
        },
        {
            titulo: "Telefone",
            propriedade: ["telefone"],
            mascara: { token: TelefonePipe },
        },
        {
            titulo: "Usuário",
            propriedade: ["usuario"]
        },
        {
            titulo: "Pesquisa",
            propriedade: ["pesquisa"],
        },
        {
            titulo: "Mercado",
            propriedade: ["mercado", "nome"]
        }
    ]
};

export const MercadoDataViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"]
        },
    ],
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const ValorDataViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"]
        },
        {
            titulo: "Definição de Valor",
            propriedade: ["definicaoValor"]
        },
    ],
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const SetorDataViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"]
        },
    ],
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const BemServicoDataViewConfig: DataViewConfig = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"]
        },
    ],
    colunasAcao: {
        editar: true,
        deletar: true
    }
};