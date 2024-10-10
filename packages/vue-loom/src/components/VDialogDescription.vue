<script setup lang="ts">
    import {DialogDescription} from './ui/dialog';
    import {type DialogDescriptionProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <DialogDescription v-bind="forwardedProps">
        <slot/>
    </DialogDescription>
</template>

<style scoped>

</style>
