<script setup lang="ts">
    import {Table} from './ui/table';
    import VCard from "./VCard.vue";
    import VCardHeader from "./VCardHeader.vue";
    import VCardTitle from "./VCardTitle.vue";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";
    import VSeparator from "./VSeparator.vue";

    defineOptions({
        inheritAttrs: false,
    });

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwarded = useForwardProps(props);
</script>

<template>
    <v-card class="p-0 gap-0">
        <v-card-header class="px-6 py-4" v-if="$slots.title">
            <v-card-title>
                <slot name="title"/>
            </v-card-title>
        </v-card-header>
        <v-separator v-if="$slots.title"/>
        <Table v-bind="{...forwarded, ...$attrs}">
            <slot/>
        </Table>
    </v-card>
</template>

<style scoped>

</style>
