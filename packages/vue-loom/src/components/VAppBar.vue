<script setup lang="ts">
    import VCard from "./VCard.vue";
    import VCardContent from "./VCardContent.vue";
    import {HTMLAttributes} from "vue";
    import {MenuItem} from "./interfaces";
    import VAppMenuTrigger from "../components/VAppMenuTrigger.vue";
    import {Menu} from 'lucide-vue-next';
    import {cn} from "../lib/utils";
    import VAppMenuItem from "./VAppMenuItem.vue";

    interface Props {
        logoSrc?: string,
        title?: string,
        items?: MenuItem[],
        class?: HTMLAttributes['class'],
    }

    const props = defineProps<Props>();
    defineEmits<{ (event: 'navigate', data: MenuItem): void }>();
</script>

<template>
    <VCard :class="[cn('rounded-none border-x-0 border-t-0 p-0 sticky top-0 z-30 min-h-16 flex justify-center', props.class)]">
        <VCardContent>
            <div class="relative flex items-center">
                <VAppMenuTrigger class="shrink mx-4 block lg:hidden">
                    <Menu/>
                </VAppMenuTrigger>
                <div class="grow flex items-center lg:px-6 lg:px-8">
                    <div class="grow flex space-x-0 lg:space-x-4 items-center justify-center lg:justify-start">
                        <slot name="logo">
                            <div v-if="logoSrc" class="max-h-16 py-2 hidden lg:block">
                                <img :src="logoSrc" alt="App bar logo image">
                            </div>
                        </slot>
                        <h1 v-if="title"
                            class="text-xl lg:text-2xl py-2 absolute lg:static left-1/2 text-nowrap -translate-x-1/2 lg:translate-x-0">
                            {{ title }}
                        </h1>
                        <div class="gap-3 hidden lg:flex">
                            <VAppMenuItem :item="item" :key="item.routeName" v-for="(item) in items?.slice(0,3)"/>
                        </div>
                    </div>
                    <div class="shrink hidden lg:block">
                        <slot name="actions"/>
                    </div>
                </div>
            </div>
        </VCardContent>
    </VCard>
</template>

<style scoped>

</style>