import { LinkItemConfig } from "../interfaces/link-item-config.interface";
import { faIdCardClip, faAddressCard, faStore, faCubes, faCity, faIndustry, faUsersGear, faGears, faChartColumn } from '@fortawesome/free-solid-svg-icons';

export const ItemLinkSideBar: LinkItemConfig[] = [
    {
        title: 'Colaboradores',
        path: '/sistema/colaborador',
        icon: faIdCardClip
    },
    {
        title: 'Clientes',
        path: '/sistema/cliente',
        icon: faAddressCard
    },
    {
        title: 'Mercados',
        path: '/sistema/mercado',
        icon: faStore
    },
    {
        title: 'Valores',
        path: '/sistema/valor',
        icon: faCubes
    },
    {
        title: 'Setores',
        path: '/sistema/setor',
        icon: faCity
    },
    {
        title: 'Bens e Serviços',
        path: '/sistema/bem-servico',
        icon: faIndustry
    },
    {
        title: 'Relatórios',
        path: '/sistema/relatorios',
        icon: faChartColumn
    }
];