<script setup lang="ts">
    import {SheetDescription} from "./ui/sheet";
    import {type DialogDescriptionProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <SheetDescription v-bind="forwardedProps">
        <slot/>
    </SheetDescription>
</template>

<style scoped>

</style>
