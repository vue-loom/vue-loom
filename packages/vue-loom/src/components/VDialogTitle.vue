<script setup lang="ts">
    import {DialogTitle} from "./ui/dialog";
    import {type DialogTitleProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DialogTitle v-bind="forwardedProps">
        <slot/>
    </DialogTitle>
</template>

<style scoped>

</style>
