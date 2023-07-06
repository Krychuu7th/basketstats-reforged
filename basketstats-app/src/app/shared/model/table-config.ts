import { ColumnType } from "../enum/column-type";
import { TableOperation } from "../enum/table-operation";

export interface TableConfig {
    tableColumns: TableColumn[];
    headerText?: string;
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

export function getCopyWithColumnIfNotExists(tableColumns: TableColumn[], column: TableColumn, first?: boolean) {
    tableColumns = !!tableColumns ? tableColumns?.filter(tableColumn => tableColumn.name !== column.name) : [];

    if (first) {
        tableColumns.unshift(column);
    } else {
        tableColumns.push(column);
    }

    return tableColumns;
}