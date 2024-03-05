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
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: '',
        color: 'primary',
        length: 4,
        loading: false,
        disabled: false,
    });

    const otpList: Ref<string[]> = ref([]);

    interface Emits {
        (event: 'update:modelValue', data: string | null): void;
    }

    const emits = defineEmits<Emits>();

    const autofocus: Ref<number> = ref(0);

    const navigateThroughInput = (event: KeyboardEvent, currentIndex: number) => {
        if (event.key === 'Backspace') {
            if (autofocus.value > 0) {
                console.log(otpList.value)
                if (otpList.value.length === props.length) {
                    autofocus.value--;
                } else if (otpList.value.length < props.length) {
                    autofocus.value--;
                }
                otpList.value.pop();
            }
        } else {
            if (autofocus.value < props.length - 1) {
                if (otpList.value[currentIndex].length > 1 && otpList.value[currentIndex] !== '') {
                    let list = otpList.value[currentIndex].split('');
                    list.forEach((val, index) => {
                        otpList.value[index] = val;
                    });
                    autofocus.value = props.length;
                } else {
                    autofocus.value++;
                }
            }
        }
    }

    watch(otpList.value, (value) => {
        if (value.length === props.length && value[props.length - 1] !== '' && autofocus.value !== 0) {
            autofocus.value++;
            emits('update:modelValue', value.join(""));
        }
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
                @keyup="navigateThroughInput($event, index)"
            />
        </div>
    </div>
</template>

<style scoped>

</style>
