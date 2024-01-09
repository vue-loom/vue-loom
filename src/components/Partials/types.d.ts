interface MenuItem {
    active: boolean,
    icon: string,
    label: string,
    routeName: string,
    routeParams: string[] | number[],
    items: MenuItem[],
}

interface Column {
    alias: string
    dataType: 'text' | 'number' | 'boolean' | 'date' | 'enum';
    header: string;
    searchable: boolean
    selector: string;
}

interface Link {
    active: boolean;
    label: string;
    url: string | null;
}

interface TableItem {
    id: number | null;

    [key: string]: any;
}

interface List {
    current_page: number;
    data: TableItem[];
    first_page_url: string | null;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: Link[];
    next_page_url: string | null;
    path: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Table {
    columns: Column[];
    list: List;
    searchable: boolean;
    term: string | null;
}

interface DataTableMenuItem {
    closure: (item: TableItem) => void;
    label: string;
    show: boolean | ((item: TableItem) => boolean);
    disabled: (item: TableItem) => boolean;
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
    id: number | null;
    name: string;
    children: TreeNode[];
    selected: boolean;
    expanded: boolean;
}

interface SelectItem {
    [key: string]: string | number;
}
