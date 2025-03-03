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
        VTagsInput,
        VTagsInputInput,
        VTagsInputItem,
        VTagsInputItemDelete,
        VTagsInputItemText,
        VCommandEmpty, VCommandGroup, VCommandItem, VCommandList,
        VCard,
        VInput,
        VMultiSelect,
    } from "/packages/vue-loom/src";
    import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue'
    import {type DataTable, type DataTableItem, type DataTableMenuItem, VDataTable} from "@vue-loom/data-table/src";
    import {ChevronDown, PlusIcon} from "lucide-vue-next";
    import menuItems from '../assets/menuItems.json';
    import {computed, ref, watch} from "vue";

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
            bool: 'n',
            enum: 'test',
            number: 10,
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@doe.com',
            bool: 'YeS',
            enum: 'new',
            number: 5,
        },
        {
            id: 3,
            name: 'Mike Hill',
            email: 'mike@hill.com',
            bool: 'yes',
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

    const tags = ref<string[]>([]);

    watch(tags, () => {
        console.log(tags.value);
    }, {deep: true});

    const frameworks = [
        { value: 'next.js', label: 'Next.js' },
        { value: 'sveltekit', label: 'SvelteKit' },
        { value: 'nuxt', label: 'Nuxt' },
        { value: 'remix', label: 'Remix' },
        { value: 'astro', label: 'Astro' },
    ]

    const modelValue = ref<string[]>([]);
    const open = ref(false);
    const searchTerm = ref('');

    const filteredFrameworks = computed(() => frameworks.filter(i => !modelValue.value.includes(i.label)));

    watch(modelValue, () => {
        console.log(modelValue.value);
    }, {deep: true});

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
    <v-app-menu title="Sandbox" subtitle="Vue Loom Testing" :items="menuItems" mobile-mode="menu">
        <v-app-bar class="bg-white" title="Sandbox Playground" :items="menuItems.slice(0, 3)">
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
            <v-tags-input v-model="modelValue" @click="open = true">
                <v-tags-input-item v-for="item in modelValue" :key="item" :value="item">
                    <v-tags-input-item-text @click.stop></v-tags-input-item-text>
                    <v-tags-input-item-delete @click.stop></v-tags-input-item-delete>
                </v-tags-input-item>

                <ComboboxRoot v-model="modelValue" v-model:open="open" v-model:search-term="searchTerm" class="w-full">
                    <ComboboxAnchor as-child>
                        <ComboboxInput placeholder="Framework..." as-child>
                            <VTagsInputInput class="w-full px-3" :class="modelValue.length > 0 ? 'mt-2' : ''" />
                        </ComboboxInput>
                    </ComboboxAnchor>

                    <ComboboxPortal>
                        <ComboboxContent>
                            <VCommandList
                                position="popper"
                                class="w-[calc(var(--radix-popper-anchor-width)+24px)] rounded-md mt-2 border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                            >
                                <VCommandEmpty />
                                <VCommandGroup>
                                    <VCommandItem
                                        v-for="framework in filteredFrameworks" :key="framework.value" :value="framework.label"
                                        @select.prevent="(ev: any) => {
                                            if (typeof ev.detail.value === 'string') {
                                                searchTerm = ''
                                                modelValue.push(ev.detail.value)
                                            }
                                            if (filteredFrameworks.length === 0) {
                                                open = false
                                            }
                                        }"
                                    >
                                        {{ framework.label }}
                                    </VCommandItem>
                                </VCommandGroup>
                            </VCommandList>
                        </ComboboxContent>
                    </ComboboxPortal>
                </ComboboxRoot>
            </v-tags-input>

            <v-input/>

            <v-multi-select :model-value="[]" :items="selectItems"/>

            <v-app-menu-trigger>
                <v-button>Toggle App Menu</v-button>
            </v-app-menu-trigger>

            <v-card class="grid grid-cols-4">
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