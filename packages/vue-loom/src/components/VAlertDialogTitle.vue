<script setup lang="ts">
    import {AlertDialogTitle} from './ui/alert-dialog';
    import {type AlertDialogTitleProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDialogTitle v-bind="forwardedProps">
        <slot/>
    </AlertDialogTitle>
</template>

<style scoped>

</style>
