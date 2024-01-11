// interface Theme {
//     primary: string;
//     secondary: string;
//     accent: string;
//     success: string;
//     warning: string;
//     danger: string;
// }

interface MenuItem {
    active: boolean,
    icon: string,
    label: string,
    routeName: string,
    routeParams: string[] | number[],
    items: MenuItem[],
}

interface DataTableColumn {
    alias: string
    dataType: 'text' | 'number' | 'boolean' | 'date' | 'enum';
    header: string;
    searchable: boolean
    selector: string;
}

interface DataTableLink {
    active: boolean;
    label: string;
    url: string | null;
}

interface DataTableItem {
    id: number | null;

    [key: string]: any;
}

interface DataTableList {
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

interface DataTableSort {
    [column: string]: 'asc' | 'desc';
}

interface Table {
    columns: DataTableColumn[];
    list: DataTableList;
    searchable?: boolean;
    term?: string | null;
    sort?: DataTableSort;
}

interface DataTableMenuItem {
    closure: (item: DataTableItem) => void;
    label: string;
    show: boolean | ((item: DataTableItem) => boolean);
    disabled: (item: DataTableItem) => boolean;
    color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
}

interface Flash {
    messageStyle?: string,
    message?: string,
    messageDuration?: number,
}

interface TreeItem {
    id: number;
    name: string;
    children: TreeItem[];
}

interface TreeNode {
    id: number;
    name: string;
    children: TreeNode[];
    selected: boolean;
    expanded: boolean;
}

interface SelectItem {
    [key: string]: string | number;
}
