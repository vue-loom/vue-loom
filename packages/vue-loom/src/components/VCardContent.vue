<script setup lang="ts">
    import {CardContent} from "./ui/card";
    import {cn} from "../lib/utils";
    import {computed, type HTMLAttributes} from "vue";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <CardContent :class="[cn('p-0', props.class)]" v-bind="forwardedProps">
        <slot/>
    </CardContent>
</template>

<style scoped>

</style>
