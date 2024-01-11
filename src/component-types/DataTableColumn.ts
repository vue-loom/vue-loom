export interface DataTableColumn {
    alias: string;
    dataType: 'text' | 'number' | 'boolean' | 'date' | 'enum';
    header: string;
    searchable: boolean;
    selector: string;
}