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
        modelValue: null,
        color: 'primary',
        autofocus: false,
        loading: false,
        disabled: false,
    });

    const innerModelValue: Ref<string | null> = ref(props.modelValue);
    const innerAutofocus: Ref<boolean> = ref(props.autofocus);
    const textField: Ref<HTMLElement | null> = ref(null);

    watch(() => props.autofocus, () => {
        if (props.autofocus) {
            innerModelValue.value = '';
            textField.value?.focus();
        }
        innerAutofocus.value = props.autofocus;
    });

    watch(() => props.loading, () => {
        if (props.loading) {
            textField.value?.blur();
        }
    })

    watch(() => props.disabled, () => {
        if (props.disabled) {
            textField.value?.blur();
        }
    })

    interface Emits {
        (event: 'update:modelValue', data: string | null): void;
    }

    const emits = defineEmits<Emits>();

    watch(() => innerModelValue.value, () => {
        emits('update:modelValue', innerModelValue.value);
    });

</script>

<template>
    <div>
        <div>
            <input
                ref="textField"
                class="w-12 h-12 text-center border border-gray-300 focus:border ring-0 focus:ring-0 focus:outline-0 rounded-md text-2xl transition-all duration-150"
                :class="resolveBorderFocus(color)"
                type="text"
                maxlength="1"
                v-model="innerModelValue"
                :autofocus="innerAutofocus"
            >
        </div>
    </div>
</template>

<style scoped>

</style>
