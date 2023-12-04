import {IProduct} from"./product";

export interface IPagination{
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    data: IProduct[];
}