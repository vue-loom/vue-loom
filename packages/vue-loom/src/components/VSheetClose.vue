<script setup lang="ts">
    import {SheetClose} from "./ui/sheet";
    import {type DialogCloseProps, useForwardProps} from "radix-vue";

    const props = defineProps<DialogCloseProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <SheetClose v-bind="forwardedProps">
        <slot/>
    </SheetClose>
</template>

<style scoped>

</style>
