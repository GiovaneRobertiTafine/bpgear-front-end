export interface DataInputDropdownConfig {
    itens: Item[],
    propertySearch: string[];
    propertyValue: string[];
}

interface Item {
    titulo: string;
    propriedade: string[];
}