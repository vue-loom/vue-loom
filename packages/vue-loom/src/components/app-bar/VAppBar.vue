<script setup lang="ts">
    //@ts-ignore
    import {VCard, VCardContent, VButton, cn} from "/packages/vue-loom/src";
    import {HTMLAttributes} from "vue";
    import {MenuItem} from "../app-menu/interfaces.ts";
    import {navigate} from '../../navigation/navigation'

    interface Props {
        logoSrc?: string,
        title?: string,
        items?: MenuItem[],
        class?: HTMLAttributes['class'],
    }

    const props = defineProps<Props>();

    const goToPage = (item: MenuItem) => {
        navigate(item.routeName)
    }

</script>

<template>
    <VCard :class="[cn('rounded-none border-b border-x-0 p-0 sticky top-0 z-30 min-h-16 flex justify-center', props.class)]">
        <VCardContent>
            <div class="flex items-center md:px-6 lg:px-8">
                <div class="grow flex space-x-4 items-center">
                    <div v-if="logoSrc" class="max-h-16 py-2">
                        <img :src="logoSrc" alt="App bar logo image">
                    </div>
                    <h1 v-if="title" class="text-2xl py-2">
                        {{ title }}
                    </h1>
                    <div class="flex h-full">
                        <div v-for="item in items?.slice(0,3)"
                             class="h-full p-2 cursor-pointer hover:underline transition-all duration-75"
                             :class="[item.active ? 'underline text-primary' : '']"
                             @click="goToPage(item)"
                        >
                            {{ item.label }}
                        </div>
                    </div>
                </div>
                <div class="shrink">
                    <slot name="actions"/>
                </div>
            </div>
        </VCardContent>
    </VCard>
</template>

<style scoped>

</style>