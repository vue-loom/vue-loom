<script setup lang="ts">
    import {Separator} from "./ui/separator";
    import {type SeparatorProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<SeparatorProps & { class?: HTMLAttributes['class'], label?: string }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <Separator v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
