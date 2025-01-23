<script setup lang="ts">
import {TagsInputInput} from "../components/ui/tags-input";
import {TagsInputInputProps, useForwardProps} from "radix-vue";
import {computed, HTMLAttributes} from "vue";
import {cn} from "../lib/utils.ts";

const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
})

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
<TagsInputInput v-bind="forwardedProps" :class="cn('border-none focus:border-none focus:outline-none focus:ring-0', props.class)"/>
</template>

<style scoped>

</style>