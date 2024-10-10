<script setup lang="ts">
    import {SheetContent, type SheetVariants} from "./ui/sheet";
    import {type DialogContentEmits, type DialogContentProps, useForwardPropsEmits, VisuallyHidden} from "radix-vue";
    import {computed, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";

    const props = defineProps<DialogContentProps & { side?: SheetVariants['side'], class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<DialogContentEmits>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <SheetContent :class="[cn('flex flex-col', props.class)]" v-bind="forwarded">
        <slot/>
    </SheetContent>
</template>

<style scoped>

</style>
