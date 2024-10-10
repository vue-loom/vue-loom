<script setup lang="ts">
import {VDataTable} from "@vue-loom/data-table";
import type {DataTable, DataTableMenuItem, DataTableItem} from "@vue-loom/data-table";
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

const table: DataTable = {
  list: {
    current_page: 1,
    first_page_url: '',
    last_page_url: null,
    prev_page_url: '',
    next_page_url: null,
    data: [
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
    ],
    from: 1,
    to: 20,
    last_page: 19,
    links: [],
    path: '',
    per_page: 10,
    total: 10,
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
  <VDataTable :table="table" :menu="menu"></VDataTable>
</template>

<style scoped>

</style>