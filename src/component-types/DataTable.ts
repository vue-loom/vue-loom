import type {DataTableColumn} from "./DataTableColumn";
import type {DataTableList} from "./DataTableList";
import type {DataTableSort} from "./DataTableSort";

export interface DataTable {
    columns: DataTableColumn[];
    list: DataTableList;
    searchable?: boolean;
    term?: string | null;
    sort?: DataTableSort;
}