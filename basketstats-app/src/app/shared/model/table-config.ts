import { ColumnType } from "../enum/column-type";
import { TableOperation } from "../enum/table-operation";

export interface TableConfig {
    tableColumns: TableColumn[];
    headerText: string;
    searchPlaceholder: string;
    addButtonTooltip: string;
    pageSizeOptions?: number[];
    tableOperations?: TableOperation[];
}

export interface TableColumn {
    name: string;
    type: ColumnType;
    translation?: string;
}