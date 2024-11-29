<script setup lang="ts">
    withDefaults(defineProps<{ value: 1 | 0 | boolean | 'yes' | 'no' | 'Yes' | 'No' }>(), {
        value: false,
    });
</script>

<template>
    <div
        class="w-fit border rounded bg-neutral-300/5 border-neutral-400 text-neutral-600 text-xs uppercase leading-none px-1 pt-[3px] pb-0.5">
        {{ value }}
    </div>
</template>

<style scoped>

</style>