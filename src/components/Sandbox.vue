<script setup lang="ts">
    //@ts-ignore
    import {VPinInput, VCard, VCardHeader, VCardTitle, VCardDescription, VCardContent, VCardFooter} from "/packages/vue-loom/src";
    import {type DataTable, type DataTableItem, type DataTableMenuItem, VDataTable} from "@vue-loom/data-table/src";
    import {PlusIcon} from "lucide-vue-next";

    const menu: DataTableMenuItem[] = [
        {
            label: 'Menu Item',
            icon: PlusIcon,
            handle: () => {
                console.log('clicked menu item');
            },
        },
        {
            label: 'Menu Item',
            handle: () => {
                console.log('clicked disabled menu item');
            },
        },
        {
            label: 'Disabled Menu Item 2',
            color: 'secondary',
            handle: () => {
                console.log('clicked disabled menu item');
            },
        },
        {
            label: 'Hidden Menu Item 1',
            color: 'warning',
            show: false,
            handle: () => {
                console.log('clicked hidden menu item');
            },
        },
        {
            label: 'Hidden Menu Item 2',
            color: 'warning',
            show: (item: DataTableItem) => item.id === 2,
            handle: () => {
                console.log('clicked hidden menu item');
            },
        },
    ];

    const rows: DataTableItem[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@doe.com',
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@doe.com',
        },
        {
            id: 3,
            name: 'Mike Hill',
            email: 'mike@hill.com',
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
        ],
        searchable: true,
        term: '',
    };
</script>

<template>
    <div class="w-full max-w-7xl mx-auto flex flex-col gap-4 p-12">
        <v-card>
            <v-card-header>
                <v-card-title>Card</v-card-title>
            </v-card-header>
            <v-card-content>
                <v-pin-input model-value=""/>
            </v-card-content>
        </v-card>

        <v-data-table :table="table" :menu="menu"/>
    </div>
</template>

<style scoped>

</style>