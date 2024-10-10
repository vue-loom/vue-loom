<script setup lang="ts">
    import {CardFooter} from "./ui/card";
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
    <CardFooter :class="[cn('grow-0 shrink-0 justify-end gap-4 p-0', props.class)]" v-bind="forwardedProps">
        <slot/>
    </CardFooter>
</template>

<style scoped>

</style>
