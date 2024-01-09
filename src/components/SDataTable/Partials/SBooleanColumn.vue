<script setup lang="ts">
    import {computed, type ComputedRef, useSlots} from "vue";

    const value: string = useSlots().default().at(0).children.toString();
    const isTrue: ComputedRef<boolean> = computed(() => parseInt(value) === 1 || value.toLowerCase() === 'true' || value.toLowerCase() === 'yes');
</script>

<template>
    <div
        class="uppercase font-bold"
        :class="isTrue ? 'text-green-700' : 'text-red-700'"
    >{{ isTrue ? 'Yes' : 'No' }}
    </div>
</template>

<style scoped>

</style>
