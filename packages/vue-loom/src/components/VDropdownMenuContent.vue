<script setup lang="ts">
    import {DropdownMenuContent} from "./ui/dropdown-menu";
    import {type DropdownMenuContentEmits, type DropdownMenuContentProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<DropdownMenuContentEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <DropdownMenuContent v-bind="forwarded">
        <slot/>
    </DropdownMenuContent>
</template>

<style scoped>

</style>
