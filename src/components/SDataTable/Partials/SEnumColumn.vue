<script setup lang="ts">
    import {useSlots} from "vue";

    const value: string = useSlots().default().at(0).children.toString().split('_').join(' ');
</script>

<template>
    <div class="font-bold uppercase text-sm" v-if="value" v-text="value"></div>
    <div v-else>-</div>
</template>

<style scoped>

</style>
