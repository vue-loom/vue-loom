<script setup lang="ts">
    import VOTPInput from "@/components/OTPInput/VOTPInput.vue";
    import VLoader from "@/components/VLoader.vue";
    import {ref, type Ref, watch} from "vue";

    interface Props {
        modelValue: string | null,
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        length?: number,
        loading?: boolean,
        disabled?: boolean,
        errorMessage?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        color: 'primary',
        length: 4,
        loading: false,
        disabled: false,
        errorMessage: '',
    });

    const otpList: Ref<string[]> = ref(props.modelValue?.split('') || []);
    const autofocus: Ref<number> = ref(0);
    const innerErrorMessage: Ref<string> = ref(props.errorMessage);

    watch((): string => props.errorMessage, (value): void => {
        innerErrorMessage.value = value;
    });

    const navigateThroughInput = (event: KeyboardEvent): void => {
        if (event.key === 'Backspace') {
            if (autofocus.value > 0) {
                autofocus.value--;
            }
        } else {
            if (autofocus.value < props.length - 1) {
                autofocus.value++;
            }
        }
    }

    interface Emits {
        (event: 'update:modelValue', data: string | null): void;
    }

    const emits = defineEmits<Emits>();

    watch(otpList.value, (value): void => {
        innerErrorMessage.value = '';

        emits('update:modelValue', value.join(''));
    });
</script>

<template>
    <div class="flex relative">
        <div v-if="loading || disabled" class="absolute w-full h-full bg-white/70 flex justify-center items-center">
            <VLoader v-if="loading" color="primary"/>
        </div>
        <div v-for="(_, index) in length" :key="index">
            <VOTPInput
                :class="index === length-1 ? '' : 'mr-2'"
                v-model="otpList[index]"
                :loading="loading"
                :disabled="disabled"
                :autofocus="autofocus === index && !disabled"
                @keyup="navigateThroughInput"
            />
        </div>
        <div class="pt-0.5 pl-1 text-red-600 text-xs" v-if="innerErrorMessage">
            {{ innerErrorMessage }}
        </div>
    </div>
</template>

<style scoped>

</style>
