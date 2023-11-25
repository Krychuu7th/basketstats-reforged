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

export function getParamValue(queryParams: QueryParams, paramKey: string): string {
    return queryParams.params?.find(p => p.key === paramKey)?.value!;
}

export function getCopyWithParamIfNotExists(queryParams: QueryParams, param: Param): QueryParams {
    queryParams = {
        ...queryParams,
        params: !!queryParams.params ? queryParams.params?.filter(p => p.key !== param.key) : []
    };
    if (param.value !== null && param.value !== undefined && param.value !== '') {
        queryParams.params?.push({ key: param.key, value: param.value });
    }
    return queryParams;
}