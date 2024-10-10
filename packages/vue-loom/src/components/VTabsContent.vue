<script setup lang="ts">
    import {TabsContent} from "./ui/tabs";
    import type {TabsContentProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<TabsContentProps & { class?: HTMLAttributes['class'] }>();
</script>

<template>
    <TabsContent v-bind="props">
        <slot/>
    </TabsContent>
</template>

<style scoped>

</style>
