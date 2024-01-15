export interface MenuItem {
    active: boolean,
    icon: string,
    label: string,
    routeName: string,
    routeParams: string[] | number[],
    items: MenuItem[],
}