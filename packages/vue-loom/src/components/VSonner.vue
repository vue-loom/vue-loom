<script setup lang="ts">
    import Sonner from "./ui/sonner/Sonner.vue";
    import {ToasterProps} from "vue-sonner";

    const props = defineProps<ToasterProps>();
</script>

<template>
    <Sonner v-bind="props"/>
</template>

<style scoped>

</style>