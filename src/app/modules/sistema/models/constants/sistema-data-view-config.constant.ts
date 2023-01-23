import { faEnvelope, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { MaskPipe } from 'ngx-mask';
import { PesquisaM1Relatorio } from 'src/app/modules/pesquisa/models/interfaces/pesquisa-m1-relatorio.dto';
import { PesquisaM2Relatorio } from 'src/app/modules/pesquisa/models/interfaces/pesquisa-m2-relatorio.dto';
import { DataViewConfig, DirecaoOrdenacao } from 'src/app/modules/shared/models/data-view-config.model';
import { TelefonePipe } from 'src/app/modules/shared/pipes/telefone.pipe';
import { NestedKeyOf, NestedKeyOfDot } from 'src/app/modules/shared/utils/script.extension';
import { BemServico } from '../interfaces/bem-servico.interface';
import { Cliente } from '../interfaces/cliente.interface';
import { Colaborador } from '../interfaces/colaborador.interface';
import { Empresa } from '../interfaces/empresa.interface';
import { Mercado } from '../interfaces/mercado.interface';
import { Setor } from '../interfaces/setor.interface';
import { Teste } from '../interfaces/teste.interface';
import { Valor } from '../interfaces/valor.inteface';

export const EmpresaDataViewConfig: DataViewConfig<NestedKeyOf<Empresa>> = {
    colunas: [
        {
            titulo: "Empresa",
            propriedade: ["nome"],
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

export const ColaboradorDataViewConfig: DataViewConfig<NestedKeyOf<Colaborador>> = {
    colunas: [
        {
            titulo: 'Selecionar Todos',
            propriedade: [],
            tooltipTitulo: 'Selecionar Todos'
        },
        {
            titulo: "Nome",
            propriedade: ["nome"],
            ordenacao: DirecaoOrdenacao.ASC
        },
        // {
        //     titulo: "Usuário",
        //     propriedade: ["usuario"]
        // },
        {
            titulo: "E-mail",
            propriedade: ["email"]
        },
        {
            titulo: "Pesquisa",
            propriedade: ["pesquisa"],
            ordenacao: DirecaoOrdenacao.ASC
        },
        {
            titulo: "Ativar/Desativar Pesquisa",
            propriedade: ["pesquisa"],
        },
        {
            titulo: "",
            iconTituloFA: faEnvelope,
            propriedade: ["pesquisa"],
            tooltipTitulo: "Enviar pesquisa por e-mail"
        }
    ],
    paginacao: {
        pagina: 1,
        paginaTamanho: 5,
    },
    colunasAcao: {
        // editar: true,
        deletar: true
    },
    classes: ['table-colaboradores']
};

export const ClienteDataViewConfig: DataViewConfig<NestedKeyOf<Cliente>> = {
    colunas: [
        {
            titulo: 'Selecionar Todos',
            propriedade: [],
            tooltipTitulo: 'Selecionar Todos'
        },
        {
            titulo: "Nome",
            propriedade: ["nome"],
            ordenacao: DirecaoOrdenacao.ASC
        },
        {
            titulo: "E-mail",
            propriedade: ["email"]
        },
        // {
        //     titulo: "CNPJ",
        //     propriedade: ["cnpj"],
        //     mascara: { token: MaskPipe, arg: "CPF_CNPJ" },
        // },
        {
            titulo: "Mercado",
            propriedade: ["mercado", "nome"],
            ordenacao: DirecaoOrdenacao.ASC
        },
        {
            titulo: "Pesquisa",
            propriedade: ["pesquisa"],
            ordenacao: DirecaoOrdenacao.ASC
        },
        {
            titulo: "Ativar/Desativar Pesquisa",
            propriedade: ["pesquisa"],
        },
        {
            titulo: "",
            iconTituloFA: faEnvelope,
            propriedade: ["pesquisa"],
            tooltipTitulo: "Enviar pesquisa por e-mail"
        }
    ],
    paginacao: {
        pagina: 1,
        paginaTamanho: 5,
    },
    colunasAcao: {
        editar: true,
        deletar: true,
        detalhar: true
    },
    classes: ['table-clientes']
};

export const ClienteDetalharViewConfig: DataViewConfig<NestedKeyOf<Cliente>> = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"],
        },
        {
            titulo: "Razao Social",
            propriedade: ["razaoSocial"],

        },
        // {
        //     titulo: "CNPJ",
        //     propriedade: ["cnpj"],
        //     mascara: { token: MaskPipe, arg: "CPF_CNPJ" },
        // },
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
            titulo: "Pesquisa",
            propriedade: ["pesquisa"],
        },
        {
            titulo: "Mercado",
            propriedade: ["mercado", "nome"]
        }
    ]
};

export const MercadoDataViewConfig: DataViewConfig<NestedKeyOf<Mercado>> = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"],
            ordenacao: DirecaoOrdenacao.ASC
        },
    ],
    paginacao: {
        pagina: 1,
        paginaTamanho: 5,
    },
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const ValorDataViewConfig: DataViewConfig<NestedKeyOf<Valor>> = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"],
            ordenacao: DirecaoOrdenacao.ASC
        },
        {
            titulo: "Definição de Valor",
            propriedade: ["definicaoValor"]
        },
    ],
    paginacao: {
        pagina: 1,
        paginaTamanho: 5,
    },
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const SetorDataViewConfig: DataViewConfig<NestedKeyOf<Setor>> = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"],
            ordenacao: DirecaoOrdenacao.ASC
        },
    ],
    paginacao: {
        pagina: 1,
        paginaTamanho: 5,
    },
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const BemServicoDataViewConfig: DataViewConfig<NestedKeyOf<BemServico>> = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome"],
            ordenacao: DirecaoOrdenacao.ASC
        },
    ],
    paginacao: {
        pagina: 1,
        paginaTamanho: 5,
    },
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const TesteDataViewConfig: DataViewConfig<NestedKeyOf<Teste>> = {
    colunas: [
        {
            titulo: "Nome",
            propriedade: ["nome", "num"]
        },
    ],
    colunasAcao: {
        editar: true,
        deletar: true
    }
};

export const TesteKeyOfDataViewConfig: DataViewConfig<keyof Teste> = {
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

export const RelatorioM1DataViewConfig: DataViewConfig<NestedKeyOf<PesquisaM1Relatorio>> = {
    colunas: [
        {
            titulo: "Colaborador",
            propriedade: ["colaborador"],
        },
        {
            titulo: "Valor",
            propriedade: ["valor"],
        },
        {
            titulo: "Ações que geram ampliam estimulam o valor",
            propriedade: ["acao"],
        },
        {
            titulo: "Responsável",
            propriedade: ["setorResponsavel"],
        },
        {
            titulo: "Envolvido",
            propriedade: ["setorEnvolvido"],
        },
    ],
};

export const RelatorioM2DataViewConfig: DataViewConfig<NestedKeyOf<PesquisaM2Relatorio>> = {
    colunas: [
        {
            titulo: "Colaborador",
            propriedade: ["nomeColaborador"],
        },
        {
            titulo: "Valor",
            propriedade: ["valores"],
        },

    ],
};
