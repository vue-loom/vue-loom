<script setup lang="ts">
    import {Slider} from "./ui/slider";
    import {type SliderRootEmits, type SliderRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<SliderRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<SliderRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Slider v-bind="forwarded"/>
</template>

<style scoped>

</style>
