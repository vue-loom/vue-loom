<script setup lang="ts">
    import VCard from "./VCard.vue";
    import VCardContent from "./VCardContent.vue";
    import {HTMLAttributes} from "vue";
    import {MenuItem} from "./interfaces.ts";
    import VAppMenuTrigger from "../components/VAppMenuTrigger.vue";
    import {Menu} from 'lucide-vue-next';
    import {cn} from "../lib/utils.ts";

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
            <div class="flex items-center">
                <VAppMenuTrigger class="shrink mx-4 block lg:hidden">
                    <Menu/>
                </VAppMenuTrigger>
                <div class="grow flex items-center lg:px-6 lg:px-8">
                    <div class="grow flex space-x-4 items-center justify-center lg:justify-start">
                        <slot name="logo">
                            <div v-if="logoSrc" class="max-h-16 py-2 hidden lg:block">
                                <img :src="logoSrc" alt="App bar logo image">
                            </div>
                        </slot>
                        <h1 v-if="title" class="text-2xl py-2">{{ title }}</h1>
                        <div class="hidden lg:block">
                            <div class="flex">
                                <div v-for="item in items?.slice(0,3)"
                                     class="h-full p-2 cursor-pointer hover:underline transition-all duration-75"
                                     :class="[item.active ? 'underline text-primary' : '']"
                                     @click="$emit('navigate', item)"
                                >
                                    {{ item.label }}
                                </div>
                            </div>
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