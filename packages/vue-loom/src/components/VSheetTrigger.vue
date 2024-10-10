<script setup lang="ts">
    import{SheetTrigger} from "./ui/sheet";
    import {type DialogTriggerProps, useForwardProps} from "radix-vue";

    const props = defineProps<DialogTriggerProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <SheetTrigger v-bind="forwardedProps">
        <slot/>
    </SheetTrigger>
</template>

<style scoped>

</style>
