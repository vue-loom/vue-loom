import {FunctionalComponent} from "vue";
import {LucideProps} from "lucide-vue-next";

export interface DataTableColumn {
    alias: string;
    dataType: 'text' | 'number' | 'boolean' | 'date' | 'enum';
    header: string;
    searchable: boolean;
    selector: string;
}

export interface DataTableItem {
    id: number | null;

    [key: string]: any;
}

export interface DataTableMenuItem {
    handle?: (item: DataTableItem) => void;
    label?: string;
    icon?: FunctionalComponent<LucideProps, {}, any, {}>
    show?: boolean | ((item: DataTableItem) => boolean);
    classes?: string;
    type?: 'default' | 'destructive' | 'separator';
}

export interface DataTableLink {
    active: boolean;
    label: string;
    url: string | null;
}

export interface DataTableList {
    current_page: number;
    data: DataTableItem[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: DataTableLink[];
    next_page_url: string | null;
    path: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface DataTableSort {
    [column: string]: 'asc' | 'desc' | null;
}

export interface DataTable {
    columns: DataTableColumn[];
    list: DataTableList;
    searchable?: boolean;
    term?: string | null;
    sort?: DataTableSort;
}

export interface DataTableModifier {
    [key: string]: Function
}