<script setup lang="ts">
    import {NavigationMenuList} from "./ui/navigation-menu";
    import {type NavigationMenuListProps, useForwardProps} from "radix-vue";
    import {type HTMLAttributes} from "vue";

    const props = defineProps<NavigationMenuListProps & { class?: HTMLAttributes['class'] }>();

    const forwardedProps = useForwardProps(props);
</script>

<template>
    <NavigationMenuList v-bind="forwardedProps">
        <slot/>
    </NavigationMenuList>
</template>

<style scoped>

</style>
