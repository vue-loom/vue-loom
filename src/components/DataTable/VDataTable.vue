<script setup lang="ts">
    import {type InertiaForm, router, useForm} from "@inertiajs/vue3";
    import {type Component, onMounted} from "vue";
    import VButton from "@/components/VButton.vue";
    import VTextField from "@/components/VTextField.vue";
    import VMenu from "@/components/VMenu.vue";
    import VListItem from "@/components/VListItem.vue";
    import VIcon from "@/components/VIcon.vue";
    import VTextColumn from "@/components/DataTable/Partials/VTextColumn.vue";
    import VNumberColumn from "@/components/DataTable/Partials/VNumberColumn.vue";
    import VBooleanColumn from "@/components/DataTable/Partials/VBooleanColumn.vue";
    import VDateColumn from "@/components/DataTable/Partials/VDateColumn.vue";
    import VEnumColumn from "@/components/DataTable/Partials/VEnumColumn.vue";
    // import VSortRenderer from "@/components/DataTable/Partials/VSortRenderer.vue";
    // import type {DataTableColumn} from "@/component-types/DataTableColumn";
    import type {DataTableItem} from "@/component-types/DataTableItem";
    import type {DataTableSort} from "@/component-types/DataTableSort";
    import type {DataTable} from "@/component-types/DataTable";
    import type {DataTableMenuItem} from "@/component-types/DataTableMenuItem";

    interface Props {
        table: DataTable;
        menu?: DataTableMenuItem[];
    }

    const props = withDefaults(defineProps<Props>(), {
        menu: () => ([]),
    });

    const columnTypes: { [key: string]: Component } = {
        'text-column': VTextColumn,
        'number-column': VNumberColumn,
        'boolean-column': VBooleanColumn,
        'date-column': VDateColumn,
        'enum-column': VEnumColumn,
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

    // const updateSort = (column: DataTableColumn, direction: 'asc' | 'desc' | null): void => {
    //     if (direction) {
    //         dataMutatorsForm.sort[column.alias] = direction;
    //     }
    // };

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
            <VTextField
                class="w-80"
                label="Search"
                v-model="dataMutatorsForm.term"
                @keyup.enter="applyDataMutators">
                <template #suffix>
                    <VIcon icon="x-mark"
                           class="cursor-pointer"
                           v-if="dataMutatorsForm.term"
                           @click="clearSearchTerm"
                    />
                </template>
            </VTextField>
            <VButton type="text" @click="applyDataMutators">Search</VButton>
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

                            <!--                            <VSortRenderer-->
                            <!--                                class="opacity-0 group-hover:opacity-100 transition-all duration-75"-->
                            <!--                                :sort="dataMutatorsForm.sort"-->
                            <!--                                :column="column"-->
                            <!--                                @update:direction="updateSort(column, $event)"-->
                            <!--                            />-->
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
                            <VButton no-relative type="text"
                                     @click="menus[getItemKey(item, itemIndex)][0].closure(item)">
                                <div class="flex flex-row items-center">
                                    <div>{{ menus[getItemKey(item, itemIndex)][0].label }}</div>
                                </div>
                            </VButton>
                        </div>
                        <div class="flex justify-end items-center"
                             v-else-if="menus[getItemKey(item, itemIndex)].length > 1"
                        >
                            <VMenu align="right" width="w-44">
                                <template #trigger="{ open }">
                                    <div
                                        class="rounded-full cursor-pointer transition-all duration-75"
                                        :class="[open ? 'bg-gray-100' : 'hover:bg-gray-50 active:bg-gray-100']"
                                    >
                                        <VIcon icon="ellipsis-vertical" :size="28"/>
                                    </div>
                                </template>

                                <template #content>
                                    <VListItem
                                        :clickable="!(menuItem.hasOwnProperty('disabled') && menuItem.disabled(item))"
                                        :color="menuItem.color"
                                        :key="menuItem.label"
                                        v-for="menuItem in menus[getItemKey(item, itemIndex)]"
                                        @click="!(menuItem.hasOwnProperty('disabled') && menuItem.disabled(item)) && menuItem.closure(item)"
                                    >
                                        <template #title>{{ menuItem.label }}</template>
                                    </VListItem>
                                </template>
                            </VMenu>
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
                <VButton type="text"
                         :disabled="table.list.prev_page_url === null"
                         @click="goToPage(table.list.prev_page_url)"
                >
                    <VIcon icon="arrow-left"/>
                </VButton>

                <div class="flex space-x-1 text-primary">
                    <div>Page</div>
                    <div class="font-bold">{{ table.list.current_page }}</div>
                    <div>of</div>
                    <div class="font-bold">{{ Math.ceil((table.list.total / table.list.per_page)) }}</div>
                </div>

                <VButton type="text"
                         :disabled="table.list.next_page_url === null"
                         @click="goToPage(table.list.next_page_url)"
                >
                    <VIcon icon="arrow-right"/>
                </VButton>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
