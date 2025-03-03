<script setup lang="ts">
    import {computed} from "vue";

    const props = withDefaults(defineProps<{ value: 1 | 0 | '1' | '0' | boolean | 'yes' | 'no' | 'Yes' | 'No' | 'y' | 'n' | 'Y' | 'N' }>(), {
      value: false,
    });

    const isTruthy = computed(() => {
      if (typeof props.value === 'string') {
        return ['1', 'y', 'yes'].includes(props.value.toLowerCase());
      }
      return Boolean(props.value);
    });
</script>

<template>
    <div class="w-fit border rounded text-xs uppercase leading-none px-1 pt-[3px] pb-0.5"
         :class="[isTruthy ? 'bg-emerald-500/5 border-emerald-600 text-emerald-600' : 'bg-destructive/5 border-destructive text-destructive']">
        {{ isTruthy ? 'Yes' : 'No' }}
    </div>
</template>

<style scoped>

</style>