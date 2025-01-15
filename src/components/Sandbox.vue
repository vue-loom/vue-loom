<script setup lang="ts">
    //@ts-ignore
    import {
        VCardHeader,
        VCardTitle,
        VCardContent,
        VDropdownMenuContent,
        VDropdownMenuLabel,
        VButton,
        VDropdownMenuItem,
        VDropdownMenu,
        VDropdownMenuTrigger,
        VDropdownMenuSeparator,
        VAppMenu,
        VAppBar,
        VAppMenuTrigger,
        VSelect,
        VCard,
        VInput,
        VMultiSelect,
    } from "/packages/vue-loom/src";
    import {type DataTable, type DataTableItem, type DataTableMenuItem, VDataTable} from "@vue-loom/data-table/src";
    import {ChevronDown, PlusIcon} from "lucide-vue-next";
    import vueLogo from "../assets/vue.svg";
    import menuItems from '../assets/menuItems.json';

    const menu: DataTableMenuItem[] = [
        {
            label: 'Open',
            icon: PlusIcon,
            handle: () => {
                console.log('Open row');
            },
        },
        {
            label: 'Edit',
            icon: PlusIcon,
            show: false,
            handle: () => {
                console.log('Edit row');
            },
        },
        {
            type: 'separator',
        },
        {
            label: 'Delete',
            type: 'destructive',
            handle: () => {
                console.log('Delete row');
            },
        },
    ];

    const rows: DataTableItem[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@doe.com',
            bool: true,
            enum: 'test',
            number: 10,
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@doe.com',
            bool: false,
            enum: 'new',
            number: 5,
        },
        {
            id: 3,
            name: 'Mike Hill',
            email: 'mike@hill.com',
            bool: true,
            enum: 'other',
            number: 12,
            date: '2024-11-22 09:27:14',
        },
    ];

    const table: DataTable = {
        list: {
            current_page: 1,
            first_page_url: '',
            last_page_url: null,
            prev_page_url: '',
            next_page_url: null,
            data: rows,
            from: 1,
            to: 3,
            last_page: 3,
            links: [],
            path: '',
            per_page: 3,
            total: 6,
        },
        columns: [
            {
                alias: 'name',
                selector: 'user.name',
                dataType: 'text',
                header: 'Name',
                searchable: true,
            },
            {
                alias: 'email',
                selector: 'user.email',
                dataType: 'text',
                header: 'Email Address',
                searchable: true,
            },
            {
                alias: 'bool',
                selector: 'user.bool',
                dataType: 'boolean',
                header: 'Boolean',
                searchable: true,
            },
            {
                alias: 'enum',
                selector: 'user.enum',
                dataType: 'enum',
                header: 'Enum',
                searchable: true,
            },
            {
                alias: 'number',
                selector: 'user.number',
                dataType: 'number',
                header: 'Number',
                searchable: true,
            },
            {
                alias: 'date',
                selector: 'user.date',
                dataType: 'date',
                header: 'Date',
                searchable: true,
            },
        ],
        searchable: true,
        term: '',
    };

    const selectItems = [
        {id: 1, name: 'Item 1'},
        {id: 2, name: 'Item 2'},
        {id: 3, name: 'Item 3'},
        {id: 4, name: 'Item 4'},
        {id: 5, name: 'Item 5'},
        {id: 6, name: 'Item 6'},
        {id: 7, name: 'Item 7'},
        {id: 8, name: 'Item 8'},
    ];
</script>

<template>
    <v-app-menu title="Sandbox" subtitle="Vue Loom Testing" :logo-src="vueLogo" :items="menuItems" mobile-mode="drawer">
        <v-app-bar class="bg-white" :logo-src="vueLogo" title="Sandbox Playground" :items="menuItems">
            <template #actions>
                <v-dropdown-menu>
                    <v-dropdown-menu-trigger as-child>
                        <v-button variant="ghost">
                            <div class="text-sm text-neutral-500">
                                {{ 'Manage Account' }}
                            </div>
                            <ChevronDown class="text-neutral-500 h-4"/>
                        </v-button>
                    </v-dropdown-menu-trigger>
                    <v-dropdown-menu-content>
                        <v-dropdown-menu-label>Manage Account</v-dropdown-menu-label>
                        <v-dropdown-menu-separator/>
                        <v-dropdown-menu-item>
                            Log Out
                        </v-dropdown-menu-item>
                    </v-dropdown-menu-content>
                </v-dropdown-menu>
            </template>
        </v-app-bar>

        <div class="w-full max-w-7xl mx-auto flex flex-col gap-4 p-12">
            <v-app-menu-trigger>
                <v-button>Toggle App Menu</v-button>
            </v-app-menu-trigger>

            <v-card class="grid grid-cols-4">
                <v-select placeholder="Select" :items="selectItems"/>
                <v-multi-select placeholder="Select" :items="selectItems"/>
                <v-input placeholder="Input"/>
            </v-card>

            <v-data-table :table="table" :menu="menu">
                <template #email="{value}">
                    <a class="text-sky-600 hover:underline" :href="`mailto:${value}`">{{ value }}</a>
                </template>
            </v-data-table>

            <v-card>
                <v-card-header>
                    <v-card-title>Card</v-card-title>
                </v-card-header>
                <v-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </v-card-content>
            </v-card>

            <v-card>
                <v-card-header>
                    <v-card-title>Card</v-card-title>
                </v-card-header>
                <v-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </v-card-content>
            </v-card>

            <v-card>
                <v-card-header>
                    <v-card-title>Card</v-card-title>
                </v-card-header>
                <v-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </v-card-content>
            </v-card>

            <v-card>
                <v-card-header>
                    <v-card-title>Card</v-card-title>
                </v-card-header>
                <v-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </v-card-content>
            </v-card>

            <v-card>
                <v-card-header>
                    <v-card-title>Card</v-card-title>
                </v-card-header>
                <v-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </v-card-content>
            </v-card>
        </div>
    </v-app-menu>
</template>

<style scoped>

</style>