<script setup lang="ts">
    import {DialogFooter} from "./ui/dialog";
    import type {HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DialogFooter v-bind="forwardedProps">
        <slot/>
    </DialogFooter>
</template>

<style scoped>

</style>
