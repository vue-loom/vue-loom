<script setup lang="ts">
    import {DialogTrigger} from "./ui/dialog";
    import {type DialogTriggerProps, useForwardProps} from "radix-vue";

    const props = defineProps<DialogTriggerProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DialogTrigger v-bind="forwardedProps">
        <slot/>
    </DialogTrigger>
</template>

<style scoped>

</style>
