import { LinkItemConfig } from "../interfaces/link-item-config.interface";
import { faIdCardClip, faAddressCard, faStore, faCubes } from '@fortawesome/free-solid-svg-icons';

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
    }
];