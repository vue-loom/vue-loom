<script setup lang="ts">
    import {RangeCalendar} from "./ui/range-calendar";
    import {type RangeCalendarRootEmits, type RangeCalendarRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const modelValue = defineModel({default: {start: undefined, end: undefined}});
    const props = defineProps<RangeCalendarRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<RangeCalendarRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <RangeCalendar v-bind="forwarded" v-model="modelValue"/>
</template>

<style scoped>

</style>
