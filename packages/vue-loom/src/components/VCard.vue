<script setup lang="ts">
    import {Card} from './ui/card';
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
    <Card :class="[cn('flex flex-col gap-6 p-6', props.class)]" v-bind="forwardedProps">
        <slot/>
    </Card>
</template>

<style scoped>

</style>
