<script setup lang="ts">
    import {computed, type ComputedRef, ref, type Ref} from "vue";
    import {
        resolveBg,
        resolveBgHover,
        resolveBorder,
        resolveText
    } from "@/partials/colors";
    import VMenu from "@/components/VMenu.vue";
    import VChip from "@/components/VChip.vue";
    import {useClickOutside} from "@/composables/mouse";
    import {onMounted} from "vue";
    import {watch} from "vue";
    import VIcon from "@/components/VIcon.vue";
    import type {SelectItem} from "@/globals/SelectItem";

    interface Props {
        modelValue: number[] | string[];
        items: SelectItem[];
        itemValue?: string;
        itemName?: string;
        label?: string;
        errorMessage?: string;
        color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        multiple?: boolean;
        autofocus?: boolean;
        readonly?: boolean;
        searchable?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: () => ([]),
        items: () => [],
        itemValue: 'id',
        itemName: 'name',
        label: '',
        errorMessage: '',
        color: 'primary',
        multiple: false,
        autofocus: false,
        readonly: false,
        searchable: false,
    });

    const innerModelValue: Ref<number[] | string[]> = ref(props.modelValue);
    const innerErrorMessage: Ref<string> = ref(props.errorMessage);
    const focused: Ref<boolean> = ref(false);
    const term: Ref<string> = ref('');

    const updateTerm = (payload: Event): string => term.value = (payload.target as HTMLElement).innerText;

    const filteredItems: ComputedRef<SelectItem[]> = computed(() => {
        if (props.searchable && term.value) {
            return props.items.filter((item: SelectItem) => item[props.itemName].toString().toLowerCase().trim().includes(term.value.toLowerCase().trim()));
        }

        return props.items;
    });

    const inputClassObject: ComputedRef<object> = computed(() => ({
        [resolveBorder(props.color)]: focused.value,
        'border-gray-300': !focused.value,
        '!border-danger': innerErrorMessage.value,
    }));

    const focusInput = (): void => {
        if (!props.readonly) {
            focused.value = true;
        }
    };

    const blurInput = (): void => {
        focused.value = false;
        term.value = '';
    };

    const inputDiv: Ref<HTMLElement | null> = ref(null);

    useClickOutside(inputDiv, (): void => {
        blurInput();
    });

    const disableNewLine = (event: KeyboardEvent): void => {
        (event.target as HTMLTextAreaElement).blur();
    };

    const textFieldLabel: Ref<HTMLElement | null> = ref(null);
    const textFieldLabelWidth: Ref<number> = ref(0);

    const setBorderGapWidth = (): void => {
        if (textFieldLabel.value) {
            textFieldLabelWidth.value = textFieldLabel.value.getBoundingClientRect().width + 4;
        }
    };

    onMounted((): void => {
        setBorderGapWidth();
    });

    const labelClassObject: ComputedRef<object> = computed(() => ({
        'top-2': !focused.value && innerModelValue.value.length === 0,
        '-top-2.5 scale-75': focused.value || innerModelValue.value.length > 0,
        [resolveText(props.color)]: focused.value,
        'text-gray-400': !focused.value,
        '!text-danger': innerErrorMessage.value,
    }));

    const selectedItems: Ref<SelectItem[]> = ref(innerModelValue.value ? props.items.filter((item: SelectItem) => innerModelValue.value.includes(item[props.itemValue] as never)) : []);

    interface Emits {
        (event: 'update:modelValue', data: number[] | string[]): void;
    }

    const emits = defineEmits<Emits>();

    watch(() => props.modelValue, (value: number[] | string[]): void => {
        innerModelValue.value = value;

        selectedItems.value = innerModelValue.value.length > 0 ? props.items.filter((item: SelectItem) => innerModelValue.value.includes(item[props.itemValue] as never)) : [];
    });

    watch((): string => props.errorMessage, (value): void => {
        innerErrorMessage.value = value;
    });

    const selectItem = (item: SelectItem): void => {
        if (!props.readonly) {
            const index = selectedItems.value.findIndex((innerItem: SelectItem) => item[props.itemValue] === innerItem[props.itemValue]);

            if (index !== -1) {
                selectedItems.value.splice(index, 1);
                innerModelValue.value.splice(index, 1);
            } else {
                selectedItems.value.push(item);
                innerModelValue.value.push(item[props.itemValue] as never);
            }

            innerErrorMessage.value = '';

            emits('update:modelValue', innerModelValue.value);
            blurInput();
        }
    }

    const removeItem = (item: SelectItem): void => {
        if (!props.readonly) {
            const index = selectedItems.value.findIndex((innerItem: SelectItem) => item[props.itemValue] === innerItem[props.itemValue]);

            if (index !== -1) {
                selectedItems.value.splice(index, 1);
                innerModelValue.value.splice(index, 1);

                innerErrorMessage.value = '';

                emits('update:modelValue', innerModelValue.value);
                blurInput();
            }
        }
    };
</script>

<template>
    <VMenu width="w-full" :disabled="readonly" :close-on-content-click="false" v-model="focused">
        <template #trigger>
            <div class="relative">
                <div ref="textFieldLabel" class="absolute left-0 top-0 scale-75 invisible z-[-1]" v-text="label"/>

                <div class="absolute left-3 top-0 border-b border-white transition-all duration-150"
                     :style="{width: focused || innerModelValue.length > 0 ? `${textFieldLabelWidth}px` : '0px'}"
                ></div>

                <div class="absolute left-3.5 transition-all origin-top-left duration-150"
                     :class="labelClassObject"
                     @click="focusInput"
                >{{ label }}
                </div>

                <VIcon icon="chevron-down"
                       class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-150"
                       :color="focused ? color : ''"
                       :class="{'rotate-180': focused}"
                />

                <div
                    class="w-full min-h-[42px] py-2 pl-2 pr-9 flex flex-wrap items-center gap-1.5 px-4 cursor-text border rounded-md transition-all duration-150"
                    ref="inputDiv"
                    :class="inputClassObject"
                    @click="focusInput"
                >
                    <VChip closable
                           :disabled="readonly"
                           :key="item[itemValue]"
                           v-for="(item) in selectedItems"
                           @click:close="removeItem(item)"
                    >{{ item[itemName] }}
                    </VChip>

                    <span contenteditable
                          role="textbox"
                          class="grow border-0 focus:border-0 ring-0 focus:ring-0 outline-0 focus:outline-0 p-0"
                          v-text="term"
                          v-if="searchable"
                          @input="updateTerm"
                          @keydown.enter.prevent="disableNewLine"
                    ></span>
                </div>

                <div class="pt-0.5 pl-1 text-red-600 text-xs" v-if="innerErrorMessage">
                    {{ innerErrorMessage }}
                </div>
            </div>
        </template>
        <template #content>
            <div class="overflow-y-auto py-2"
                 :class="[filteredItems.length > 0 ? 'max-h-56' : '']"
            >
                <div
                    class="px-3 py-1.5 select-none active:bg-gray-50 cursor-pointer transition-all duration-75"
                    :class="[innerModelValue.includes(item[itemValue] as never) ? `${resolveText(color)} ${resolveBg(color)} bg-opacity-20 hover:bg-opacity-30` : `bg-white ${resolveBgHover(color)} hover:bg-opacity-10`]"
                    :key="item[itemValue]"
                    v-for="(item) in filteredItems"
                    @click="selectItem(item)"
                >{{ item[itemName] }}
                </div>
                <div class="text-gray-400 text-center italic px-2" v-if="filteredItems.length === 0">
                    {{ searchable && term ? `No results for term "${term}"` : 'No items to display' }}
                </div>
            </div>
        </template>
    </VMenu>
</template>

<style scoped>

</style>
