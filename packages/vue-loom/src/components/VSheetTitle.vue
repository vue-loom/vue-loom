<script setup lang="ts">
    import {SheetTitle} from "./ui/sheet";
    import {type DialogTitleProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <SheetTitle v-bind="forwardedProps">
        <slot/>
    </SheetTitle>
</template>

<style scoped>

</style>
