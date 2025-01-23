export interface MenuItem {
    active: boolean,
    label: string,
    url?: string,
    badge?: number | string | null,
    items?: MenuItem[],
}