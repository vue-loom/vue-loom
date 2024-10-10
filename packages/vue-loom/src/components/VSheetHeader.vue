<script setup lang="ts">
    import {SheetHeader} from "./ui/sheet";
    import {computed, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SheetHeader :class="[cn('shrink-0 grow-0', props.class)]" v-bind="forwardedProps">
        <slot/>
    </SheetHeader>
</template>

<style scoped>

</style>
