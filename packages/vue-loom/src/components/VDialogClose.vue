<script setup lang="ts">
    import {DialogClose} from "./ui/dialog";
    import {type DialogCloseProps, useForwardProps} from "radix-vue";

    const props = defineProps<DialogCloseProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DialogClose v-bind="forwardedProps">
        <slot/>
    </DialogClose>
</template>

<style scoped>

</style>
