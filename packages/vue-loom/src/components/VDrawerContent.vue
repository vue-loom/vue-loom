<script setup lang="ts">
    import {DrawerContent} from "./ui/drawer";
    import {type DialogContentEmits, type DialogContentProps, useForwardPropsEmits} from "radix-vue";
    import type {HtmlHTMLAttributes} from "vue";

    const props = defineProps<DialogContentProps & { class?: HtmlHTMLAttributes['class'] }>();
    const emits = defineEmits<DialogContentEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <DrawerContent v-bind="forwarded">
        <slot/>
    </DrawerContent>
</template>

<style scoped>

</style>