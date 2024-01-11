import type {DataTableItem} from "./DataTableItem";

export interface DataTableMenuItem {
    closure: (item: DataTableItem) => void;
    label: string;
    show: boolean | ((item: DataTableItem) => boolean);
    disabled: (item: DataTableItem) => boolean;
    color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}