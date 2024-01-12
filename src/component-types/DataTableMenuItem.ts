import type {DataTableItem} from "./DataTableItem";

export interface DataTableMenuItem {
    handle: (item: DataTableItem) => void;
    label: string;
    show?: boolean | ((item: DataTableItem) => boolean);
    disabled?: boolean | ((item: DataTableItem) => boolean);
    color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}