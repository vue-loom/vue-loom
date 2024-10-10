<script setup lang="ts">
    import {NavigationMenuLink} from "./ui/navigation-menu";
    import {type NavigationMenuLinkEmits, type NavigationMenuLinkProps, useForwardPropsEmits} from "radix-vue";

    const props = defineProps<NavigationMenuLinkProps>();
    const emits = defineEmits<NavigationMenuLinkEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <NavigationMenuLink v-bind="forwarded">
        <slot/>
    </NavigationMenuLink>
</template>

<style scoped>

</style>
