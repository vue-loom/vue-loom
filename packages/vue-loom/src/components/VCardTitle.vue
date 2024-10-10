<script setup lang="ts">
    import {CardTitle} from "./ui/card";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CardTitle v-bind="forwardedProps">
        <slot/>
    </CardTitle>
</template>

<style scoped>

</style>
