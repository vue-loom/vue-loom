<script setup lang="ts">
    import {AlertDialogCancel} from './ui/alert-dialog';
    import {type AlertDialogCancelProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDialogCancel v-bind="forwardedProps">
        <slot/>
    </AlertDialogCancel>
</template>

<style scoped>

</style>
