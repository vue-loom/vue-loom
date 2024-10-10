<script setup lang="ts">
    import {Accordion} from './ui/accordion';
    import {cn} from "../lib/utils";
    import {type AccordionRootEmits, type AccordionRootProps, useForwardPropsEmits} from "radix-vue";
    import {computed, type HTMLAttributes} from "vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<AccordionRootEmits>();

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <Accordion :class="[cn('w-full', props.class)]" v-bind="forwarded">
        <slot/>
    </Accordion>
</template>

<style scoped>

</style>
