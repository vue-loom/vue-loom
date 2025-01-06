<script setup lang="ts">
    //@ts-ignore
    import {
        VPinInput,
        VCard,
        VCardHeader,
        VCardTitle,
        VCardContent,
        VAppBar,
        VDropdownMenuContent,
        VDropdownMenuLabel,
        VButton,
        VDropdownMenuItem,
        VDropdownMenu,
        VDropdownMenuTrigger,
        VDropdownMenuSeparator,
        VAppMenu,
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
</script>

<template>
    <VAppMenu title="Sandbox" subtitle="Vue Loom Testing" :logo-src="vueLogo">
        <VAppBar :logo-src="vueLogo" title="Sandbox Playground">
            <template #actions>
                <VDropdownMenu>
                    <VDropdownMenuTrigger as-child>
                        <VButton variant="ghost">
                            <div class="text-sm text-neutral-500">
                                {{ 'Manage Account' }}
                            </div>
                            <ChevronDown class="text-neutral-500 h-4"/>
                        </VButton>
                    </VDropdownMenuTrigger>
                    <VDropdownMenuContent>
                        <VDropdownMenuLabel>Manage Account</VDropdownMenuLabel>
                        <VDropdownMenuSeparator/>
                        <VDropdownMenuItem>
                            Log Out
                        </VDropdownMenuItem>
                    </VDropdownMenuContent>
                </VDropdownMenu>
            </template>
        </VAppBar>

        <div class="w-full max-w-7xl mx-auto flex flex-col gap-4 p-12">
            <v-card>
                <v-card-header>
                    <v-card-title>Card</v-card-title>
                </v-card-header>
                <v-card-content>
                    <v-pin-input model-value=""/>
                </v-card-content>
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
    </VAppMenu>
</template>

<style scoped>

</style>