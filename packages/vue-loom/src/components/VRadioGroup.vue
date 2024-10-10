<script setup lang="ts">
    import {RadioGroup, RadioGroupItem} from "./ui/radio-group";
    import {type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits} from "radix-vue";
    import {type HTMLAttributes} from "vue";
    import {Label} from './ui/label';

    interface Props extends RadioGroupRootProps {
        items: Array<Record<string, any>>,
        itemValue?: string,
        itemText?: string,
    }

    const props = withDefaults(defineProps<Props & { class?: HTMLAttributes['class'] }>(), {
      itemValue: 'id',
      itemText: 'name',
    });
    const emits = defineEmits<RadioGroupRootEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <RadioGroup v-bind="forwarded">
        <slot>
            <div v-if="items.length > 0" v-for="item in items" :key="item[itemValue]">
                <Label class="flex items-center gap-2">
                    <RadioGroupItem :value="item[itemValue]"/>
                    {{ item[itemText] }}
                </Label>
            </div>
        </slot>
    </RadioGroup>
</template>

<style scoped>

</style>
