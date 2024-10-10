<script setup lang="ts">
    import {Badge, type BadgeVariants} from "./ui/badge";
    import {computed, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ variant?: BadgeVariants['variant'], class?: HTMLAttributes['class'] }>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <Badge :class="[cn('w-fit', props.class)]" v-bind="forwardedProps">
        <slot/>
    </Badge>
</template>

<style scoped>

</style>
