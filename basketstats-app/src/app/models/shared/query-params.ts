import { SortDirection } from "@angular/material/sort";

export interface QueryParams {
    page?: number;
    size?: number;
    sort?: SortParam;
    params?: Param[];
}

export interface SortParam {
    name: string;
    direction: SortDirection;
}

export interface Param {
    key: string;
    value: string;
}