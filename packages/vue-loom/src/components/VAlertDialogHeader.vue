<script setup lang="ts">
    import {AlertDialogHeader} from "./ui/alert-dialog";
    import {type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <AlertDialogHeader v-bind="forwardedProps">
        <slot/>
    </AlertDialogHeader>
</template>

<style scoped>

</style>
