<script setup lang="ts">
    import VCard from "./VCard.vue";
    import {HTMLAttributes, onBeforeMount, ref} from "vue";
    import {cn} from "../lib/utils";
    import {MenuItem} from "./interfaces";
    import VAppMenuItem from "./VAppMenuItem.vue";
    import {useAppMenu} from "../composables/useAppMenu";
    import {debouncedWatch, useWindowSize} from "@vueuse/core";
    import VDropdownMenu from "./VDropdownMenu.vue";
    import VDropdownMenuTrigger from "./VDropdownMenuTrigger.vue";
    import VButton from "./VButton.vue";
    import VDropdownMenuContent from "./VDropdownMenuContent.vue";
    import VDropdownMenuLabel from "./VDropdownMenuLabel.vue";
    import VDropdownMenuSeparator from "./VDropdownMenuSeparator.vue";
    import {PanelTopClose} from 'lucide-vue-next';
    import VSheet from "./VSheet.vue";
    import VSheetContent from "./VSheetContent.vue";
    import VSheetHeader from "./VSheetHeader.vue";
    import {VisuallyHidden} from "radix-vue";
    import VSheetTitle from "./VSheetTitle.vue";
    import VSheetDescription from "./VSheetDescription.vue";

    interface Props {
        title?: string,
        subtitle?: string,
        class?: HTMLAttributes['class'],
        items: MenuItem[],
        mobileBreakpoint?: number | string,
        mobileMode?: 'menu' | 'drawer',
        mobileSide?: 'top' | 'right' | 'bottom' | 'left',
    }

    const props = withDefaults(defineProps<Props>(), {
        mobileBreakpoint: 1024,
        mobileMode: 'menu',
        mobileSide: 'left',
    });

    const appMenu = useAppMenu();
    const {width} = useWindowSize();

    onBeforeMount(() => {
        appMenu.isOpen.value = width.value >= Number(props.mobileBreakpoint);

        if (props.mobileMode === 'drawer') {
            appMenu.isDrawer.value = true;
        }
    });

    debouncedWatch(width, (value) => {
        if (!appMenu.useChanged.value) {
            appMenu.isOpen.value = value >= Number(props.mobileBreakpoint);
        }
    }, {debounce: 200});

    const mobileMenuIsOpen = ref<boolean>(false);
</script>

<template>
    <div class="min-h-dvh h-full flex">
        <v-card :class="[cn('w-72 h-dvh overflow-auto sticky top-0 rounded-none border-y-0 border-l-0', props.class)]"
                v-show="appMenu.isOpen.value"
                v-if="width >= mobileBreakpoint"
        >
            <div class="flex flex-col items-center">
                <slot name="logo"/>

                <h1 class="text-3xl mt-2" v-if="title">{{ title }}</h1>
                <h2 class="text-neutral-600" v-if="subtitle">{{ subtitle }}</h2>
            </div>
            <div class="flex flex-col gap-3">
                <VAppMenuItem :item="item" :key="item.url" v-for="(item) in items"/>
            </div>
        </v-card>
        <div class="w-full flex flex-col">
            <slot/>
        </div>

        <template v-if="width < mobileBreakpoint">
            <v-dropdown-menu v-model:open="mobileMenuIsOpen" v-if="mobileMode === 'menu'">
                <v-dropdown-menu-trigger as-child>
                    <v-button class="fixed bottom-6 right-6 lg:hidden bg-primary px-2">
                        <PanelTopClose class="transition-transform duration-300" :class="[mobileMenuIsOpen ? 'rotate-180' : '']"/>
                    </v-button>
                </v-dropdown-menu-trigger>
                <v-dropdown-menu-content class="w-52" align="end" :side-offset="4">
                    <v-dropdown-menu-label>{{ title }}</v-dropdown-menu-label>
                    <v-dropdown-menu-separator class="m-0"/>
                    <div class="max-h-96 flex flex-col gap-1 overflow-auto p-2">
                        <VAppMenuItem :item="item" :key="item.url" v-for="(item) in items"/>
                    </div>
                </v-dropdown-menu-content>
            </v-dropdown-menu>

            <v-sheet v-model:open="appMenu.isOpen.value" v-else-if="mobileMode === 'drawer'">
                <v-sheet-content class="overflow-auto" :side="mobileSide">
                    <v-sheet-header>
                        <VisuallyHidden>
                            <v-sheet-title/>
                            <v-sheet-description/>
                        </VisuallyHidden>

                        <slot name="logo"/>

                        <h1 class="text-3xl mt-2" v-if="title">{{ title }}</h1>
                        <h2 class="text-neutral-600" v-if="subtitle">{{ subtitle }}</h2>
                    </v-sheet-header>
                    <div class="flex flex-col gap-2">
                        <VAppMenuItem :item="item" :key="item.url" v-for="(item) in items"/>
                    </div>
                </v-sheet-content>
            </v-sheet>
        </template>
    </div>
</template>

<style scoped>

</style>