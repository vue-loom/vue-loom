<script setup lang="ts">
    import {AlertDialogTrigger} from './ui/alert-dialog';
    import {type AlertDialogTriggerProps, useForwardProps} from "radix-vue";
    import type {HTMLAttributes} from "vue";

    const props = defineProps<AlertDialogTriggerProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDialogTrigger v-bind="forwardedProps">
        <slot/>
    </AlertDialogTrigger>
</template>

<style scoped>

</style>
