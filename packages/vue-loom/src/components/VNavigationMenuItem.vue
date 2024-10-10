<script setup lang="ts">
    import {NavigationMenuItem} from "./ui/navigation-menu";
    import {type NavigationMenuItemProps, useForwardProps} from "radix-vue";

    const props = defineProps<NavigationMenuItemProps>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <NavigationMenuItem v-bind="forwardedProps">
        <slot/>
    </NavigationMenuItem>
</template>

<style scoped>

</style>
