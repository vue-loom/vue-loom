<script setup lang="ts">
    import {Tabs} from "./ui/tabs";
    import {type TabsRootEmits, type TabsRootProps, useForwardPropsEmits} from "radix-vue";

    const props = defineProps<TabsRootProps>();
    const emits = defineEmits<TabsRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <Tabs v-bind="forwarded">
        <slot/>
    </Tabs>
</template>

<style scoped>

</style>
