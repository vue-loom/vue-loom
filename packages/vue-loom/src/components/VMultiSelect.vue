<script setup lang="ts">
    import {TagsInput, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput} from "./ui/tags-input";
    import {computed, type HTMLAttributes, onBeforeMount, type Ref, ref, watch} from "vue";
    import {Label} from "./ui/label";
    import {Popover, PopoverContent, PopoverTrigger} from "./ui/popover";
    import {useForwardProps} from "radix-vue";
    import {cn} from "../lib/utils";
    import {Check} from "lucide-vue-next";
    import {Command, CommandGroup, CommandItem, CommandList} from './ui/command';

    defineOptions({
        inheritAttrs: false,
    });

    interface Props {
        disabled?: boolean,
        label?: string,
        placeholder?: string,
        items: Record<string, any>[],
        itemValue?: string,
        itemText?: string,
        class?: HTMLAttributes['class'],
    }

    const modelValue = defineModel<(string | number)[]>();
    const errorMessage = defineModel<string | number>('errorMessage');
    const props = withDefaults(defineProps<Props>(), {
        itemValue: 'id',
        itemText: 'name',
    });

    const delegatedProps = computed(() => {
        const {class: _, ...delegated} = props;

        return delegated;
    });

    const forwarded = useForwardProps(delegatedProps);

    watch(modelValue, () => {
        errorMessage.value = '';
    });

    const open: Ref<boolean> = ref(false);

    const selectItem = (item: Record<string, any>): void => {
        const index = selectedItems.value.findIndex((selectedItem) => selectedItem[props.itemValue] === item[props.itemValue]);

        if (index !== -1) {
            selectedItems.value.splice(index, 1);
        } else {
            selectedItems.value.push(item);
        }
    };

    const selectedItems: Ref<Record<string, any>[]> = ref([]);

    onBeforeMount(() => {
        selectedItems.value = props.items.filter((item) => modelValue.value?.includes(item[props.itemValue]));
    });

    watch(selectedItems, (items) => {
        modelValue.value = items.map((item) => item[props.itemValue]);
    }, {deep: true});
</script>

<template>
    <div class="flex flex-col gap-1">
        <Label v-if="label">{{ label }}</Label>
        <Popover v-model:open="open">
            <PopoverTrigger as-child>
                <TagsInput :class="[cn('py-1', props.class)]" v-bind="{...forwarded, ...$attrs}" v-model="selectedItems">
                    <TagsInputItem class="bg-muted" v-for="(item) in selectedItems" :key="item[itemValue]" :value="item[itemText]">
                        <TagsInputItemText/>
                        <TagsInputItemDelete @click="selectItem(item)"/>
                    </TagsInputItem>

                    <TagsInputInput readonly class="border-none focus:border-none focus:outline-none focus:ring-0"
                                    :placeholder="placeholder"/>
                </TagsInput>
            </PopoverTrigger>
            <PopoverContent class="p-1">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem :value="item[itemValue].toString()" v-for="(item) in items" :key="item[itemValue]"
                                         @select="selectItem(item)">
                                {{ item[itemText] }}
                                <Check :class="cn('ml-auto h-4 w-4', modelValue?.includes(item[itemValue]) ? 'opacity-100' : 'opacity-0')"/>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        <p v-if="errorMessage" class="text-destructive text-xs">{{ errorMessage }}</p>
    </div>
</template>

<style scoped>

</style>
