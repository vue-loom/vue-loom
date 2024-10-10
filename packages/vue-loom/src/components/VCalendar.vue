<script setup lang="ts">
    import {Calendar} from "./ui/calendar";
    import {type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<CalendarRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Calendar v-bind="forwarded"/>
</template>

<style scoped>

</style>
