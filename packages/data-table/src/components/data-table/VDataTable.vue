<script setup lang="ts">
    import {ColumnDef, createColumnHelper} from "@tanstack/vue-table";
    import {h} from 'vue';
    import {FlexRender, getCoreRowModel, useVueTable} from '@tanstack/vue-table';
    import {
        VTable,
        VTableHeader,
        VTableRow,
        VTableHead,
        VTableBody,
        VTableCell,
        VButton,
        VDropdownMenu,
        VDropdownMenuTrigger,
        VDropdownMenuContent,
        VDropdownMenuItem,
    } from "@vue-loom/vue-loom";
    // } from "/packages/vue-loom/src";
    import {ChevronLeft, ChevronRight, EllipsisVertical} from 'lucide-vue-next';
    import {navigate} from '@vue-loom/utils';
    import {type DataTable, type DataTableMenuItem, type DataTableColumn, type DataTableItem} from "./interface";
    import VDataTableColumn from "./VDataTableColumn.vue";
    import {cn, VDropdownMenuSeparator} from "@vue-loom/vue-loom";

    type Modifiers<T extends { columns: { alias: string }[] }> = {
        [key in T['columns'][number]['alias']]?: Function;
    };

    interface Props {
        table: DataTable,
        menu?: DataTableMenuItem[],
        modifiers?: Modifiers<DataTable>,
    }

    const props = withDefaults(defineProps<Props>(), {});

    const columns: ColumnDef<unknown, never>[] = props.table.columns.map((column: DataTableColumn) => {
        let modifier = props.modifiers?.[column.alias];
        return createColumnHelper().accessor(column.alias, {
            header: column.header,
            cell: (info) => {
                const value = info.getValue();

                return h(VDataTableColumn, {column, value: modifier ? modifier(value) : value});
            },
        });
    });

    if (props.menu) {
        columns.push(createColumnHelper().display({
            id: 'actions',
            header: 'Actions',
            cell: (cell) => {
                if (props.menu?.length && props.menu?.length > 1) {
                    return h('div', {class: 'flex justify-end'}, h(VDropdownMenu, () => [
                        h(VDropdownMenuTrigger, {class: 'cursor-pointer'}, () => h(EllipsisVertical)),
                        h(VDropdownMenuContent, {align: 'end'}, () => [
                            props.menu?.filter((item: DataTableMenuItem) => {
                                if (typeof item.show === 'boolean') {
                                    return item.show;
                                } else if (typeof item.show === 'function') {
                                    return item.show(cell.row.original as DataTableItem);
                                }

                                return true;
                            }).map((item: DataTableMenuItem) => {
                                if (['default', 'destructive'].includes(item.type || 'default')) {
                                    let typeClasses: string = '';

                                    if (item.type === 'destructive') {
                                        typeClasses = 'text-destructive focus:text-destructive';
                                    }

                                    return h(VDropdownMenuItem, {
                                        class: `gap-2 ${cn(item.classes, typeClasses)}`,
                                        onClick: item.handle?.bind(null, cell.row.original as DataTableItem),
                                    }, () => {
                                        if (item.icon) {
                                            return [h(item.icon, {class: 'w-5 h-5'}), item.label];
                                        }

                                        return item.label;
                                    });
                                }

                                return h(VDropdownMenuSeparator);
                            }),
                        ]),
                    ]));
                }

                return h(
                    'div',
                    {class: 'flex justify-end'},
                    h(
                        VButton,
                        {
                            variant: 'link',
                            class: 'h-fit p-0',
                            onClick: props.menu?.[0].handle?.bind(null, cell.row.original as DataTableItem)
                        },
                        () => props.menu?.[0]['label'],
                    ),
                );
            },
        }));
    }

    const mainTable = useVueTable({
        get data() {
            return props.table.list.data;
        },
        get columns() {
            return columns as ColumnDef<unknown, any>[];
        },
        getCoreRowModel: getCoreRowModel(),
    });

    const goToPage = (url: string | null): void => {
        if (url !== null) {
            navigate(url);
        }
    };
</script>

<template>
    <div class="flex flex-col gap-4">
        <v-table>
            <v-table-header>
                <v-table-head
                    :class="[header.id === 'actions' && menu?.length ? 'text-end' : '']"
                    :key="header.id"
                    v-for="header in mainTable.getHeaderGroups()[0].headers">
                    <FlexRender
                        v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                        :props="header.getContext()"
                    />
                </v-table-head>
            </v-table-header>
            <v-table-body>
                <template v-if="mainTable.getRowModel().rows?.length">
                    <v-table-row
                        v-for="row in mainTable.getRowModel().rows" :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined"
                    >
                        <v-table-cell class="px-4 py-3" v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <slot :name="cell.column.id" :value="cell.getValue()">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
                            </slot>
                        </v-table-cell>
                    </v-table-row>
                </template>
                <template v-else>
                    <v-table-row>
                        <v-table-cell :colspan="columns.length" class="h-24 text-center">
                            No results.
                        </v-table-cell>
                    </v-table-row>
                </template>
            </v-table-body>
        </v-table>
        <div class="flex justify-between select-none"
             v-show="table.list.total > table.list.per_page"
        >
            <div class="h-fit flex gap-1 text-primary leading-none">
                <div>Showing</div>
                <div class="font-bold">{{ table.list.from }}</div>
                <div>-</div>
                <div class="font-bold">{{ table.list.to }}</div>
                <div class="hidden sm:inline">items of</div>
                <div class="font-bold hidden sm:inline">{{ table.list.total }}</div>
                <div class="hidden sm:inline">items</div>
            </div>
            <div class="flex items-center gap-3">
                <v-button class="px-2" :disabled="table.list.prev_page_url === null"
                          @click="goToPage(table.list.prev_page_url)"
                >
                    <ChevronLeft/>
                </v-button>

                <div class="flex gap-1 text-primary">
                    <div>Page</div>
                    <div class="font-bold">{{ table.list.current_page }}</div>
                    <div>of</div>
                    <div class="font-bold">{{ Math.ceil((table.list.total / table.list.per_page)) }}</div>
                </div>

                <v-button class="px-2" :disabled="table.list.next_page_url === null"
                          @click="goToPage(table.list.next_page_url)"
                >
                    <ChevronRight/>
                </v-button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
