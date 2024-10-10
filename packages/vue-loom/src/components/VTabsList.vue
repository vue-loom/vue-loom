<script setup lang="ts">
    import {TabsList} from "./ui/tabs";
    import type {TabsListProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<TabsListProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
    <TabsList v-bind="props">
        <slot/>
    </TabsList>
</template>

<style scoped>

</style>
