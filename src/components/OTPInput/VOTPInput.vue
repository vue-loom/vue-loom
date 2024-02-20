<script setup lang="ts">
    import type {Ref} from "vue";
    import {ref, watch} from "vue";
    import {resolveBorderFocus} from "@/partials/colors";

    interface Props {
        modelValue: string | null,
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        autofocus?: boolean,
        loading?: boolean,
        disabled?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        color: 'primary',
        autofocus: false,
        loading: false,
        disabled: false,
    });

    const innerModelValue: Ref<string | null> = ref(props.modelValue);
    const innerAutofocus: Ref<boolean> = ref(props.autofocus);
    const textField: Ref<HTMLElement | null> = ref(null);

    watch((): boolean => props.autofocus, (value): void => {
        if (value) {
            innerModelValue.value = '';
            textField.value?.focus();
        }

        innerAutofocus.value = props.autofocus;
    });

    watch((): boolean => props.loading, (value): void => {
        if (value) {
            textField.value?.blur();
        }
    })

    watch((): boolean => props.disabled, (value): void => {
        if (value) {
            textField.value?.blur();
        }
    })

    interface Emits {
        (event: 'update:modelValue', data: string | null): void;
    }

    const emits = defineEmits<Emits>();

    watch((): string | null => innerModelValue.value, (val): void => {
        emits('update:modelValue', val);
    });
</script>

<template>
    <input
        ref="textField"
        class="w-10 h-10 text-center border border-gray-300 focus:border ring-0 focus:ring-0 focus:outline-0 rounded-md text-2xl transition-all duration-150"
        type="text"
        :maxlength="1"
        :class="resolveBorderFocus(color)"
        :autofocus="innerAutofocus"
        v-model="innerModelValue"
    >
</template>

<style scoped>

</style>
