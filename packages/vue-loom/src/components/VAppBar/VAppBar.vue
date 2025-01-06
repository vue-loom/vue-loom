<script setup lang="ts">
    //@ts-ignore
    import {VCard, VCardContent, VButton} from "/packages/vue-loom/src";

    interface Props {
        logoSrc?: string,
        title?: string,
        items?: Record<string, any>[]
    }

    defineProps<Props>();

</script>

<template>
    <div>
        <VCard class="rounded-none border-b p-0">
            <VCardContent>
                <div class="flex items-center md:px-6 lg:px-8">
                    <div class="grow flex space-x-4 items-center p-2">
                        <div v-if="logoSrc">
                            <img :src="logoSrc" alt="This is the Logo">
                        </div>
                        <div v-if="title">
                            {{title}}
                        </div>
                        <div v-for="item in items">
                            {{item}}
                        </div>
                    </div>
                    <div class="shrink">
                        <slot name="actions"/>
                    </div>
                </div>
            </VCardContent>
        </VCard>
    </div>
</template>

<style scoped>

</style>