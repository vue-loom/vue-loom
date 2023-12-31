<script setup lang="ts">

import SOTPInput from "@/components/SOTPInput/SOTPInput.vue";
import {computed, type ComputedRef, ref, type Ref, watch} from "vue";
import {resolveBorderFocus} from "@/components/Partials/colors";

interface Props {
    modelValue: string | null;
    color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
    autofocus?: boolean;
    readonly?: boolean;
    errorMessage?: string;
    length?: number;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    color: 'primary',
    autofocus: false,
    readonly: false,
    errorMessage: '',
    length: 7,
});

const innerModelValue: Ref<string | null> = ref(props.modelValue);
const focused: Ref<boolean> = ref(false);


watch(() => props.modelValue, (value) => {
    innerModelValue.value = value;
});

interface Emits {
    (event: 'update:modelValue', data: string | null);
}

const emits = defineEmits<Emits>();

watch(innerModelValue, (value) => {
    emits('update:modelValue', value);
});

const inputClassObject: ComputedRef<object> = computed(() => ({
    [resolveBorderFocus(props.color)]: focused.value,
    'border-gray-300': !focused.value,
    'text-center': !props.modelValue,
    'text-end': props.modelValue,
}));
</script>

<template>
<div class="flex space-x-2">
    <SOTPInput :class="inputClassObject"
               v-model="innerModelValue"
               v-for="field in length"
    />
</div>
</template>

<style scoped>

</style>
