<script setup lang="ts">
    import {type InertiaForm, router, useForm} from "@inertiajs/vue3";
    import {type Component, onMounted} from "vue";
    import SButton from "@/components/SButton.vue";
    import STextField from "@/components/STextField.vue";
    import SMenu from "@/components/SMenu/SMenu.vue";
    import SListItem from "@/components/SListItem.vue";
    import SIcon from "@/components/SIcon.vue";
    import STextColumn from "@/components/SDataTable/Partials/STextColumn.vue";
    import SNumberColumn from "@/components/SDataTable/Partials/SNumberColumn.vue";
    import SBooleanColumn from "@/components/SDataTable/Partials/SBooleanColumn.vue";
    import SDateColumn from "@/components/SDataTable/Partials/SDateColumn.vue";
    import SEnumColumn from "@/components/SDataTable/Partials/SEnumColumn.vue";
    import SSortRenderer from "@/components/SDataTable/Partials/SSortRenderer.vue";

    interface Props {
        table: Table;
        menu?: DataTableMenuItem[];
    }

    const props = withDefaults(defineProps<Props>(), {
        menu: () => ([]),
    });

    const columnTypes: { [key: string]: Component } = {
        'text-column': STextColumn,
        'number-column': SNumberColumn,
        'boolean-column': SBooleanColumn,
        'date-column': SDateColumn,
        'enum-column': SEnumColumn,
    };

    const getItemKey = (item: DataTableItem, index: number): number => {
        return item.id || index;
    };

    const buildItemMenu = (item: DataTableItem): DataTableMenuItem[] => props.menu.reduce((carry: DataTableMenuItem[], menuItem: DataTableMenuItem) => {
        if (!menuItem.show || (typeof menuItem.show === 'function' && menuItem.show(item))) {
            carry.push(menuItem);
        }

        return carry;
    }, []);

    interface ItemMenu {
        [key: number]: DataTableMenuItem[];
    }

    const menus: ItemMenu = props.table.list.data.reduce((carry: ItemMenu, item: DataTableItem, itemIndex: number) => {
        carry[getItemKey(item, itemIndex)] = buildItemMenu(item);

        return carry;
    }, {});

    const dataMutatorsForm: InertiaForm<{
        page: number;
        term: string;
        sort: DataTableSort;
    }> = useForm({
        page: 1,
        term: '',
        sort: {},
    });

    const setDataMutatorsFromTable = (): void => {
        dataMutatorsForm.page = props.table.list.current_page || 1;
        dataMutatorsForm.term = props.table.term || '';
        dataMutatorsForm.sort = props.table.sort || {};
    };

    onMounted(() => {
        setDataMutatorsFromTable();
    });

    const updateSort = (column: DataTableColumn, direction: 'asc' | 'desc'): void => {
        dataMutatorsForm.sort[column.alias] = direction;
    };

    const applyDataMutators = (): void => {
        dataMutatorsForm.page = 1;
        dataMutatorsForm.get(window.location.href);
    };

    const clearSearchTerm = (): void => {
        dataMutatorsForm.term = '';

        if (props.table.term) {
            applyDataMutators();
        }
    };

    const goToPage = (url: string | null): void => {
        if (url !== null) {
            router.visit(url, {
                preserveScroll: true,
            });
        }
    };
</script>

<template>
    <div class="bg-white border-y-4 border-primary shadow-md rounded-lg">
        <div class="flex space-x-3 justify-end items-center px-4 py-2 bg-white"
             v-show="table.searchable"
        >
            <STextField
                class="w-80"
                label="Search"
                v-model="dataMutatorsForm.term"
                @keyup.enter="applyDataMutators">
                <template #suffix>
                    <SIcon icon="x-mark"
                           class="cursor-pointer"
                           v-if="dataMutatorsForm.term"
                           @click="clearSearchTerm"
                    />
                </template>
            </STextField>
            <SButton type="text" @click="applyDataMutators">Search</SButton>
        </div>
        <div class="relative overflow-x-auto max-h-[calc(100vh-350px)]">
            <table class="w-full">
                <thead>
                <tr class="text-primary uppercase sticky top-0 select-none">
                    <th v-for="column in table.columns" :key="column.header"
                        class="px-6 h-14 bg-gray-100 font-bold text-sm text-left whitespace-nowrap group"
                    >
                        <div class="flex items-center space-x-2">
                            <div>{{ column.header }}</div>

                            <SSortRenderer
                                class="opacity-0 group-hover:opacity-100 transition-all duration-75"
                                :sort="dataMutatorsForm.sort"
                                :column="column"
                                @update:direction="updateSort(column, $event)"
                            />
                        </div>
                    </th>
                    <th v-if="menu.length > 0" class="px-6 py-4 bg-gray-100 font-bold text-sm text-right">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, itemIndex) in table.list.data"
                    :key="getItemKey(item, itemIndex)"
                    :class="[itemIndex < table.list.data.length - 1 ? 'border-b' : '']"
                    class="last:border-none border-gray-100"
                >
                    <td v-for="column in table.columns" :key="column.header"
                        class="px-6 py-4 whitespace-nowrap"
                    >
                        <component
                            :is="columnTypes[`${column.dataType}-column`]"
                            :term="dataMutatorsForm.term"
                            :searchable="column.searchable"
                        >{{ item[column.alias] }}
                        </component>
                    </td>
                    <td class="h-fit text-right px-6 py-2"
                        v-show="menu.length > 0"
                    >
                        <div v-if="menus[getItemKey(item, itemIndex)].length === 1"
                             class="flex justify-end items-center"
                        >
                            <SButton no-relative type="text"
                                     @click="menus[getItemKey(item, itemIndex)][0].closure(item)">
                                <div class="flex flex-row items-center">
                                    <div>{{ menus[getItemKey(item, itemIndex)][0].label }}</div>
                                </div>
                            </SButton>
                        </div>
                        <div class="flex justify-end items-center"
                             v-else-if="menus[getItemKey(item, itemIndex)].length > 1"
                        >
                            <SMenu align="right" width="w-44">
                                <template #trigger="{ open }">
                                    <div
                                        class="rounded-full cursor-pointer transition-all duration-75"
                                        :class="[open ? 'bg-gray-100' : 'hover:bg-gray-50 active:bg-gray-100']"
                                    >
                                        <SIcon icon="ellipsis-vertical" :size="28"/>
                                    </div>
                                </template>

                                <template #content>
                                    <SListItem
                                        :clickable="!(menuItem.hasOwnProperty('disabled') && menuItem.disabled(item))"
                                        :color="menuItem.color"
                                        :key="menuItem.label"
                                        v-for="menuItem in menus[getItemKey(item, itemIndex)]"
                                        @click="!(menuItem.hasOwnProperty('disabled') && menuItem.disabled(item)) && menuItem.closure(item)"
                                    >
                                        <template #title>{{ menuItem.label }}</template>
                                    </SListItem>
                                </template>
                            </SMenu>
                        </div>
                    </td>
                </tr>
                <tr class="h-14" v-if="table.list.data.length === 0">
                    <td class="fixed left-1/2 -translate-x-1/2 text-center text-gray-400 py-3.5"
                        v-if="!dataMutatorsForm.term"
                    >No records to display yet
                    </td>
                    <td class="fixed left-1/2 -translate-x-1/2 text-center text-gray-400 py-3.5"
                        v-else
                    >No results found matching <span class="italic">'{{ dataMutatorsForm.term }}'</span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="flex justify-between items-center px-4 py-2 bg-white border-t select-none"
             v-show="table.list.total > table.list.per_page"
        >
            <div class="flex space-x-1 text-primary">
                <div>Showing</div>
                <div class="font-bold">{{ table.list.from }}</div>
                <div>-</div>
                <div class="font-bold">{{ table.list.to }}</div>
                <div class="hidden sm:inline">items from a total of</div>
                <div class="font-bold hidden sm:inline">{{ table.list.total }}</div>
                <div class="hidden sm:inline">items</div>
            </div>
            <div class="flex items-center space-x-3">
                <SButton type="text"
                         :disabled="table.list.prev_page_url === null"
                         @click="goToPage(table.list.prev_page_url)"
                >
                    <SIcon icon="arrow-left"/>
                </SButton>

                <div class="flex space-x-1 text-primary">
                    <div>Page</div>
                    <div class="font-bold">{{ table.list.current_page }}</div>
                    <div>of</div>
                    <div class="font-bold">{{ Math.ceil((table.list.total / table.list.per_page)) }}</div>
                </div>

                <SButton type="text"
                         :disabled="table.list.next_page_url === null"
                         @click="goToPage(table.list.next_page_url)"
                >
                    <SIcon icon="arrow-right"/>
                </SButton>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
