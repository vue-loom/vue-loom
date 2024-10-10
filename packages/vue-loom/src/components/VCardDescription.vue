<script setup lang="ts">
    import {CardDescription} from "./ui/card";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CardDescription v-bind="forwardedProps">
        <slot/>
    </CardDescription>
</template>

<style scoped>

</style>
