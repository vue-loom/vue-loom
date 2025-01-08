export interface MenuItem {
    active: boolean,
    icon: string,
    label: string,
    routeName: string,
    routeParams: Record<string, any>[],
    items?: MenuItem[],
}