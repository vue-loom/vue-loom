<script setup lang="ts">
    import {DropdownMenuItem} from "./ui/dropdown-menu";
    import {type DropdownMenuItemProps, useForwardProps} from "radix-vue";
    import {computed, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";

    const props = defineProps<DropdownMenuItemProps & { class?: HTMLAttributes['class'], inset?: boolean }>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DropdownMenuItem :class="cn('cursor-pointer', props.class)" v-bind="forwardedProps">
        <slot/>
    </DropdownMenuItem>
</template>

<style scoped>

</style>
