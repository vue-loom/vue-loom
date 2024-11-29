<script setup lang="ts">
    withDefaults(defineProps<{ value: 1 | 0 | boolean | 'yes' | 'no' | 'Yes' | 'No' }>(), {
        value: false,
    });
</script>

<template>
    <div class="w-fit border rounded text-xs uppercase leading-none px-1 pt-[3px] pb-0.5"
         :class="[!!value || (value || '').toString().toLowerCase() === 'yes' ? 'bg-emerald-500/5 border-emerald-600 text-emerald-600' : 'bg-destructive/5 border-destructive text-destructive']">
        {{ !!value || (value || '').toString().toLowerCase() === 'yes' ? 'Yes' : 'No' }}
    </div>
</template>

<style scoped>

</style>