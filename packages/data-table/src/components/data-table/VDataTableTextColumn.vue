<script setup lang="ts">
    withDefaults(defineProps<{ value: string }>(), {
        value: '',
    });
</script>

<template>
    <div>
        {{ value || '-' }}
    </div>
</template>

<style scoped>

</style>