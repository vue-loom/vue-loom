<script setup lang="ts">
    import VCard from "./VCard.vue";
    import {HTMLAttributes, onBeforeMount, ref} from "vue";
    import {cn} from "../lib/utils.ts";
    import {MenuItem} from "./interfaces.ts";
    import VAppMenuItem from "./VAppMenuItem.vue";
    import {useAppMenu} from "../composables/useAppMenu.ts";
    import {debouncedWatch, useWindowSize} from "@vueuse/core";
    import VDropdownMenu from "./VDropdownMenu.vue";
    import VDropdownMenuTrigger from "./VDropdownMenuTrigger.vue";
    import VButton from "./VButton.vue";
    import VDropdownMenuContent from "./VDropdownMenuContent.vue";
    import VDropdownMenuLabel from "./VDropdownMenuLabel.vue";
    import VDropdownMenuSeparator from "./VDropdownMenuSeparator.vue";
    import {PanelTopClose} from 'lucide-vue-next';
    import VDrawer from "./VDrawer.vue";
    import VDrawerContent from "./VDrawerContent.vue";
    import VDrawerHeader from "./VDrawerHeader.vue";
    import VSeparator from "./VSeparator.vue";
    import {VisuallyHidden} from "radix-vue";
    import VDrawerTitle from "./VDrawerTitle.vue";
    import VDrawerDescription from "./VDrawerDescription.vue";

    interface Props {
        title?: string,
        subtitle?: string,
        logoSrc?: string,
        class?: HTMLAttributes['class'],
        items: MenuItem[],
        mobileBreakpoint?: number | string,
        mobileMode?: 'menu' | 'drawer',
    }

    const props = withDefaults(defineProps<Props>(), {
        mobileBreakpoint: 1024,
        mobileMode: 'menu',
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
        <v-card :class="[cn('min-w-72 max-w-72 h-dvh overflow-auto sticky top-0 rounded-none border-y-0 border-l-0 pt-12', props.class)]"
                v-show="appMenu.isOpen.value"
                v-if="width >= mobileBreakpoint"
        >
            <div class="flex flex-col items-center">
                <slot name="logo">
                    <div class="max-h-14">
                        <img alt="App menu logo image" :src="logoSrc">
                    </div>
                </slot>
                <h1 class="text-3xl mt-2" v-if="title">{{ title }}</h1>
                <h2 class="text-neutral-600" v-if="subtitle">{{ subtitle }}</h2>
            </div>
            <div class="flex flex-col gap-3">
                <VAppMenuItem :item="item" :key="item.routeName" v-for="(item) in items"/>
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
                    <v-dropdown-menu-label>Quick Access</v-dropdown-menu-label>
                    <v-dropdown-menu-separator/>
                    <div class="max-h-96 overflow-auto">
                        <VAppMenuItem :item="item" :key="item.routeName" v-for="(item) in items"/>
                    </div>
                </v-dropdown-menu-content>
            </v-dropdown-menu>

            <v-drawer v-model:open="appMenu.isOpen.value" v-else-if="mobileMode === 'drawer'">
                <v-drawer-content>
                    <v-drawer-header>
                        <VisuallyHidden>
                            <v-drawer-title/>
                            <v-drawer-description/>
                        </VisuallyHidden>

                        <slot name="logo">
                            <div class="max-h-14 flex justify-center">
                                <img alt="App menu logo image" :src="logoSrc">
                            </div>
                        </slot>
                        <h1 class="text-3xl mt-2" v-if="title">{{ title }}</h1>
                        <h2 class="text-neutral-600" v-if="subtitle">{{ subtitle }}</h2>
                    </v-drawer-header>
                    <v-separator/>
                    <div class="max-h-96 flex flex-col gap-2 overflow-auto py-2">
                        <VAppMenuItem :item="item" :key="item.routeName" v-for="(item) in items"/>
                    </div>
                </v-drawer-content>
            </v-drawer>
        </template>
    </div>
</template>

<style scoped>

</style>