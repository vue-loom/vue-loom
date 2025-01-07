<script setup lang="ts">
    import VCard from "../VCard.vue";
    import {HTMLAttributes} from "vue";
    import {cn} from "../../lib/utils.ts";
    import {MenuItem} from "./interfaces.ts";
    import VAppMenuItem from "./VAppMenuItem.vue";

    interface Props {
        title?: string,
        subtitle?: string,
        logoSrc?: string,
        class?: HTMLAttributes['class'],
        items: MenuItem[],
    }

    const props = defineProps<Props>();
</script>

<template>
    <div class="min-h-dvh h-full flex">
        <v-card :class="[cn('min-w-72 max-w-72 min-h-dvh h-full sticky top-0 rounded-none border-y-0 border-l-0 pt-12', props.class)]">
            <div class="flex flex-col items-center">
                <div class="max-h-16">
                    <img alt="App menu logo image" :src="logoSrc">
                </div>
                <h1 class="text-3xl mt-2" v-if="title">{{ title }}</h1>
                <h2 class="text-neutral-600" v-if="subtitle">{{ subtitle }}</h2>
            </div>
            <div class="flex flex-col gap-2">
                <VAppMenuItem :item="item" :key="item.routeName" v-for="(item) in items"/>
            </div>
        </v-card>
        <div class="w-full flex flex-col">
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>