<script setup lang="ts">
    import {RadioGroup} from "./ui/radio-group";
    import {type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<RadioGroupRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <RadioGroup v-bind="forwarded">
        <slot/>
    </RadioGroup>
</template>

<style scoped>

</style>
