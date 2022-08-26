import { DataInputDropdownConfig } from "src/app/shared/models/data-input-dropdown-config.model";

export const MercadoDataInputDropdown: DataInputDropdownConfig = {
    itens: [
        // {
        //     titulo: 'Id',
        //     propriedade: ['id']
        // },
        {
            titulo: '',
            propriedade: ['nomeMercado']
        }
    ],
    propertySearch: ['nomeMercado'],
    propertyValue: ['id']
};