<script setup lang="ts">
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
    <div :class="cn('flex grow', props.class)" v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
