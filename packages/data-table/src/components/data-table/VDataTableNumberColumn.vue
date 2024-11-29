<script setup lang="ts">
    withDefaults(defineProps<{ value: string | number }>(), {
        value: '',
    });
</script>

<template>
    <div class="text-primary font-semibold">
        {{ value || '-' }}
    </div>
</template>

<style scoped>

</style>