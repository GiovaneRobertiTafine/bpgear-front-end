import { DataInputDropdownConfig } from "src/app/modules/shared/models/data-input-dropdown-config.model";

export const MercadoDataInputDropdown: DataInputDropdownConfig = {
    itens: [
        // {
        //     titulo: 'Id',
        //     propriedade: ['id']
        // },
        {
            titulo: '',
            propriedade: ['nome']
        }
    ],
    propertySearch: ['nome'],
    propertyValue: ['id']
};