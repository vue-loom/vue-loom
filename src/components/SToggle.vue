<script setup lang="ts">
    import {ref, type Ref} from "vue";
    import {resolveBg} from "@/components/Partials/colors";

    interface Props {
        modelValue: boolean | string | number;
        trueValue?: string | number | boolean;
        falseValue?: string | number | boolean;
        label?: string;
        color?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: false,
        trueValue: true,
        falseValue: false,
        label: '',
        color: 'primary',
    });

    const innerModelValue: Ref<boolean | string | number> = ref(props.modelValue);
    const toggleState: Ref<boolean> = ref(innerModelValue.value === props.trueValue);

    interface Emits {
        (event: 'update:modelValue', data: boolean | string | number);
    }

    const emits = defineEmits<Emits>();

    const switchToggle = (): void => {
        toggleState.value = !toggleState.value;
        if (toggleState.value) {
            innerModelValue.value = props.trueValue;
        } else {
            innerModelValue.value = props.falseValue;
        }

        emits('update:modelValue', innerModelValue.value);
    }
</script>

<template>
    <div class="relative flex items-center space-x-2 select-none">
        <div class="relative w-10 h-6 rounded-full transition-all duration-150 cursor-pointer"
             :class="[toggleState ? `${resolveBg(color)}` : `bg-gray-400`]"
             @click="switchToggle()"
        >
            <div class="h-full w-6 absolute p-0.5 transition-all duration-150"
                 :class="[toggleState ? `right-0` : `right-4`]">
                <div class="bg-white w-full h-full rounded-full"/>
            </div>
        </div>
        <div class="text-gray-500 text-sm">{{ label }}</div>
    </div>
</template>

<style scoped>

</style>
