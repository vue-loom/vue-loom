<script setup lang="ts">
    interface Props {
        modelValue?: boolean;
        value: string | number | null;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
    });


</script>

<template>
    <div class="flex space-x-1 items-center">
        <input class="w-5 h-5 outline-0 focus:outline-0"
               type="radio"
               :value="value"
        >
        <label>
            <slot name="label"></slot>
        </label>
    </div>
</template>

<style scoped>

</style>