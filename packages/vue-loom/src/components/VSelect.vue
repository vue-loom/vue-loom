<script setup lang="ts">
    import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from './ui/select';
    import {type HTMLAttributes, watch} from "vue";
    import {cn} from "../lib/utils";
    import {Label} from './ui/label';

    interface Props {
        disabled?: boolean,
        label?: string,
        placeholder?: string,
        items: Record<string, any>[],
        itemValue?: string,
        itemText?: string,
        class?: HTMLAttributes['class'],
    }

    const modelValue = defineModel<string | number | null | undefined>({required: true, default: ''});
    const errorMessage = defineModel<string | number>('errorMessage');

    const props = withDefaults(defineProps<Props>(), {
        itemValue: 'id',
        itemText: 'name',
    });

    watch(modelValue, () => {
        errorMessage.value = '';
    });
</script>

<template>
    <div class="flex flex-col gap-1">
        <Label v-if="label">{{ label }}</Label>
        <Select :model-value="modelValue?.toString()" :disabled="disabled" @update:modelValue="modelValue = $event">
            <SelectTrigger
                :class="cn('w-[180px] focus:ring-offset-0 focus:ring-0 focus:border-ring', props.class)">
                <SelectValue :placeholder="placeholder"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="item in items" :value="item[itemValue]?.toString()">
                        {{ item[itemText] }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <p v-if="errorMessage" class="text-destructive text-xs">{{ errorMessage }}</p>
    </div>
</template>

<style scoped>

</style>
