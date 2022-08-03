import { LinkItemConfig } from "../interfaces/link-item-config.interface";
import { faIdCardClip, faAddressCard, faStore } from '@fortawesome/free-solid-svg-icons';

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
        path: '/sitema/mercado',
        icon: faStore
    }
];