import { ColumnType } from "../enum/column-type";

export interface TableConfig {
    tableColumns: TableColumn[];
    headerText: string;
    searchPlaceholder: string;
    addButtonTooltip: string;
    pageSizeOptions: number[];
}

export interface TableColumn {
    name: string;
    type: ColumnType;
    translation: string;
}