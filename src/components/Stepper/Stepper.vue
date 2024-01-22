<script setup lang="ts">
    import {ref, type Ref, watch} from "vue";

    interface Props {
        modelValue: number | string;
    }

    const props = defineProps<Props>();

    const innerModelValue: Ref<number | string> = ref(props.modelValue);

    watch((): number | string => props.modelValue, (val): number | string => innerModelValue.value = val);

    interface Emits {
        (event: 'update:modelValue', data: number | string): void;
    }

    const emits = defineEmits<Emits>();

    const selectStep = (stepValue: number | string) => {
        console.log(stepValue);
        innerModelValue.value = stepValue;

        emits('update:modelValue', innerModelValue.value);
    };
</script>

<template>
    <div>
        <div class="flex justify-between" @select:step="selectStep($event)">
            <slot name="steps"></slot>
        </div>
        <div class="flex">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>

</style>