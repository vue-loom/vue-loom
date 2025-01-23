<script setup lang="ts">
    import { type HTMLAttributes, computed } from 'vue'
    import { type TagsInputRootEmits, type TagsInputRootProps, useForwardPropsEmits } from 'radix-vue'
    import {cn} from "../lib/utils.ts";
    import {TagsInput} from "../components/ui/tags-input";

    const props = defineProps<TagsInputRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<TagsInputRootEmits>();

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props;

        return delegated;
    })

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <TagsInput v-bind="forwarded" :class="cn('py-[7px]', props.class)">
        <slot />
    </TagsInput>
</template>
