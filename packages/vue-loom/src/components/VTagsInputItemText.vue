<script setup lang="ts">
    import { type HTMLAttributes, computed } from 'vue'
    import { type TagsInputItemTextProps, useForwardProps } from 'radix-vue'
    import {cn} from "../lib/utils.ts";
    import {TagsInputItemText} from "../components/ui/tags-input";

    const props = defineProps<TagsInputItemTextProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props;

        return delegated;
    })

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <TagsInputItemText v-bind="forwardedProps" :class="cn('', props.class)" />
</template>
