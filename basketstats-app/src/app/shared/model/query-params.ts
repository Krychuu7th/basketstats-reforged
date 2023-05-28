import { SortDirection } from "@angular/material/sort";

export interface QueryParams {
    pagination?: Pagination;
    sort?: SortParam;
    params?: Param[];
}

export interface Pagination {
    page: number;
    size: number;
}

export interface SortParam {
    name: string;
    direction: SortDirection;
}

export interface Param {
    key: string;
    value: string;
}

export const defaultQueryParams: QueryParams = {
    pagination: {
        page: 0,
        size: 10
    },
    params: []
};