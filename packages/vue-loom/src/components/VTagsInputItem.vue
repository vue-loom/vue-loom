<script setup lang="ts">
    import {type HTMLAttributes, computed} from 'vue'
    import {type TagsInputItemProps, useForwardProps} from 'radix-vue'
    import {cn} from "../lib/utils";
    import {TagsInputItem} from "./ui/tags-input";

    const props = defineProps<TagsInputItemProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    })

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <TagsInputItem v-bind="forwardedProps" :class="cn('bg-muted', props.class)">
        <slot/>
    </TagsInputItem>
</template>
