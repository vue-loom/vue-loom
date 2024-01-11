import type {DataTableItem} from "./DataTableItem";
import type {DataTableLink} from "./DataTableLink";

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