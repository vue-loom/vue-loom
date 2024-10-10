<script setup lang="ts">
    import {CardHeader} from "./ui/card";
    import {type HTMLAttributes} from "vue";
    import {cn} from "../lib/utils";
    import {useForwardProps} from "radix-vue";

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <CardHeader :class="[cn('p-0', props.class)]" v-bind="forwardedProps">
        <slot/>
    </CardHeader>
</template>

<style scoped>

</style>
