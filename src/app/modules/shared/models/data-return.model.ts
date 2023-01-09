interface IStatusReturn {
    code: number;
    message?: string;
}

interface IPaginacaoReturn {
    colecaoTamanho: number;
}

interface IPaginatedData<T> {
    resultado: T;
    tamanhoColecao: number;
}
export interface IDataReturn<T> {
    data: T;
    resultStatus: IStatusReturn;
    resultPaginacao?: IPaginacaoReturn;
}

export interface IServicePaginatedDataReturn<T> {
    data: IPaginatedData<T>;
    resultStatus: IStatusReturn;
}
