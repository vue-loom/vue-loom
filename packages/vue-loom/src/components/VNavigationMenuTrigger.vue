<script setup lang="ts">
    import {NavigationMenuTrigger} from "./ui/navigation-menu";
    import {type NavigationMenuTriggerProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<NavigationMenuTriggerProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <NavigationMenuTrigger v-bind="forwardedProps">
        <slot/>
    </NavigationMenuTrigger>
</template>

<style scoped>

</style>
