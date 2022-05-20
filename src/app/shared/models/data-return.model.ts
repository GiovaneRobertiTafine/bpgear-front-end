interface IStatusReturn {
    code: number;
    message?: string;
}

interface IPaginatedData<T> {
    resultado: T;
    tamanhoColecao: number;
}
export interface IDataReturn<T> {
    data: T;
    resultStatus: IStatusReturn;
}

export interface IServicePaginatedDataReturn<T> {
    data: IPaginatedData<T>;
    resultStatus: IStatusReturn;
}
