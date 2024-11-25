<script setup lang="ts">
    import {PinInput, PinInputGroup, PinInputInput} from './ui/pin-input';
    import {Label} from "./ui/label";
    import {type Ref, ref, watch} from "vue";

    const modelValue = defineModel<string | null | undefined>({required: true, default: ''});
    const errorMessage = defineModel<string>('errorMessage');
    const innerModelValue: Ref<string[]> = ref((modelValue.value || '').toString().split(''));

    interface Props {
        label?: string,
        length?: string | number,
        errorMessage?: string,
    }

    withDefaults(defineProps<Props>(), {
        length: 6,
    });

    watch(modelValue, (value): void => {
        innerModelValue.value = (value || '').toString().split('');
        errorMessage.value = ''
    });
</script>

<template>
    <div class="flex flex-col gap-1">
        <Label v-if="label">{{ label }}</Label>
        <PinInput
            otp
            id="pin-input"
            type="number"
            placeholder="○"
            v-model="innerModelValue"
            @complete="modelValue = $event.join('')"
        >
            <PinInputGroup class="flex-wrap gap-2">
                <PinInputInput
                    class="border rounded-md text-xl placeholder:text-neutral-300 placeholder-shown:text-xs focus:ring-offset-0 focus:ring-0 focus:border-ring"
                    :key="id" :index="index"
                    v-for="(id, index) in Number(length)"/>
            </PinInputGroup>
        </PinInput>
        <p class="text-destructive text-xs" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<style scoped>

</style>
