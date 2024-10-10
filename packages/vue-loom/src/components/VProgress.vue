<script setup lang="ts">
    import {Progress} from "./ui/progress";
    import {computed, type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";
    import {type ProgressRootProps, useForwardProps} from "radix-vue";

    const modelValue = defineModel({default: 0});
    const props = defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = computed(() => {
        const {class: _, modelValue: __, ...delegated} = props;

        return delegated;
    });

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <Progress :class="[cn('bg-muted', props.class)]" :model-value="modelValue" v-bind="forwardedProps"/>
</template>

<style scoped>

</style>
