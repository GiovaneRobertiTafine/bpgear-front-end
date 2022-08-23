export interface DataInputDropdownConfig {
    itens: Item[],
    propertySearch: string[];
}

interface Item {
    titulo: string;
    propriedade: string[];
}