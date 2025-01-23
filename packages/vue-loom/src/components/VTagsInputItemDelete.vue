<script setup lang="ts">
    import { type HTMLAttributes, computed } from 'vue'
    import { type TagsInputItemDeleteProps, useForwardProps } from 'radix-vue'
    import { X } from 'lucide-vue-next'
    import {cn} from "../lib/utils";
    import {TagsInputItemDelete} from "./ui/tags-input";

    const props = defineProps<TagsInputItemDeleteProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props;

        return delegated;
    })

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <TagsInputItemDelete v-bind="forwardedProps" :class="cn('', props.class)">
        <slot>
            <X class="w-4 h-4" />
        </slot>
    </TagsInputItemDelete>
</template>
