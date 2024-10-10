<script setup lang="ts">
    import {TabsTrigger} from "./ui/tabs";
    import {type TabsTriggerProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'], value: string | number }>();

    const forwardedProps = useForwardProps(props)
</script>

<template>
    <TabsTrigger v-bind="forwardedProps" :value="value">
        <slot/>
    </TabsTrigger>
</template>

<style scoped>

</style>
