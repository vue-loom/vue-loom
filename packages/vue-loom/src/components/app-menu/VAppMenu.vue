<script setup lang="ts">
    import VCard from "../VCard.vue";
    import {HTMLAttributes} from "vue";
    import {cn} from "../../lib/utils.ts";

    interface Props {
        title?: string,
        subtitle?: string,
        logoSrc?: string,
        class?: HTMLAttributes['class'],
    }

    const props = defineProps<Props>();

    console.log(props.logoSrc)
</script>

<template>
    <div class="min-h-dvh h-full flex">
        <v-card :class="[cn('min-w-80 max-w-80 min-h-dvh h-full sticky top-0 rounded-none border-y-0 border-l-0 pt-12', props.class)]">
            <div class="flex flex-col items-center">
                <div class="max-h-16">
                    <img alt="App menu logo image" :src="logoSrc">
                </div>
                <h1 class="text-3xl mt-2">{{ title }}</h1>
                <h2 class="text-neutral-600">{{ subtitle }}</h2>
            </div>
        </v-card>
        <div class="w-full flex flex-col">
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>