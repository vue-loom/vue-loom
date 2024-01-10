<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, type Ref, ref} from 'vue';
    import {
        resolveBg,
        resolveText,
        resolveBgHover,
        resolveBorder,
    } from "@/components/Partials/colors";
    import {watch} from "vue";
    import VMenu from "@/components/VMenu.vue";
    import {useClickOutside} from "@/components/Composables/mouse";
    import SIcon from "@/components/SIcon.vue";

    interface Props {
        modelValue: number | string | null;
        items?: SelectItem[];
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
        modelValue: null,
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

    const innerModelValue: Ref<number | string | null> = ref(props.modelValue || null);
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
        'top-2': !focused.value && !innerModelValue.value,
        '-top-2.5 scale-75': focused.value || innerModelValue.value,
        [resolveText(props.color)]: focused.value,
        'text-gray-400': !focused.value,
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

    const findItem = (): SelectItem | null => {
        const item: SelectItem | undefined = props.items.find((item: SelectItem) => item[props.itemValue] === innerModelValue.value);

        if (item) {
            return item;
        }

        return null;
    };

    const selectedItem: Ref<SelectItem | null> = ref(innerModelValue.value ? findItem() : null);

    const displayName: ComputedRef<string> = computed(() => selectedItem.value ? selectedItem.value[props.itemName] as string : '');

    const inputClassObject: ComputedRef<object> = computed(() => ({
        [resolveBorder(props.color)]: focused.value,
        'border-gray-300': !focused.value,
        '!border-danger': innerErrorMessage.value,
    }));

    interface Emits {
        (event: 'update:modelValue', data: number | string): void;
    }

    const emits = defineEmits<Emits>();

    watch(() => props.modelValue, (value: number | string | null) => {
        innerModelValue.value = value;

        selectedItem.value = innerModelValue.value ? (props.items.find((item: SelectItem) => item[props.itemValue] === innerModelValue.value) || null) : null;
    });

    watch(() => props.errorMessage, (value) => {
        innerErrorMessage.value = value;
    });

    const selectItem = (item: SelectItem): void => {
        innerErrorMessage.value = '';
        selectedItem.value = item;
        innerModelValue.value = item[props.itemValue];

        emits('update:modelValue', innerModelValue.value);
    }
</script>

<template>
    <div class="relative">
        <VMenu width="w-full" position="bottom" align="left">
            <template #trigger="{ open }">
                <div ref="textFieldLabel" class="absolute left-0 top-0 text-xs invisible z-[-1]" v-text="label"/>

                <div class="absolute left-3 -top-[2px] border-y-[2px] border-white transition-all duration-150"
                     :style="{width: focused || innerModelValue ? `${textFieldLabelWidth}px` : '0px'}"
                ></div>

                <div class="absolute left-3.5 transition-all origin-top-left duration-150"
                     :class="labelClassObject"
                     @click="focusInput"
                >{{ label }}
                </div>

                <SIcon icon="chevron-down"
                       class="absolute right-2 top-1/2 -translate-y-1/2 transition-all duration-150"
                       :color="open ? color : ''"
                       :class="{'rotate-180': open}"
                />

                <div
                    class="w-full min-h-[40px] py-2 pl-2 pr-9 flex flex-wrap items-center gap-1.5 px-4 cursor-text border rounded-md transition-all duration-150"
                    ref="inputDiv"
                    :class="inputClassObject"
                    @click="focusInput"
                >
                    <div v-show="searchable ? !focused : true">{{ displayName }}</div>

                    <span contenteditable
                          role="textbox"
                          class="grow border-0 focus:border-0 ring-0 focus:ring-0 outline-0 focus:outline-0 p-0"
                          v-text="term"
                          v-if="searchable"
                          @input="updateTerm"
                          @keydown.enter.prevent="disableNewLine"
                    ></span>
                </div>

                <div class="pt-0.5 pl-1 text-red-600 text-xs" v-if="innerErrorMessage">{{ innerErrorMessage }}</div>
            </template>
            <template #content>
                <div ref="dropdownMenu"
                     class="overflow-y-auto py-2"
                     :class="[filteredItems.length > 0 ? 'max-h-56' : '']"
                >
                    <div
                        class="px-3 py-1.5 select-none active:bg-gray-50 cursor-pointer transition-all duration-75"
                        :class="[innerModelValue === item[itemValue] ? `${resolveText(color)} ${resolveBg(color)} bg-opacity-20 hover:bg-opacity-30` : `bg-white ${resolveBgHover(color)} hover:bg-opacity-10`]"
                        :key="item[itemValue]"
                        v-for="(item) in filteredItems"
                        @click="selectItem(item)"
                    >{{ item[itemName] }}
                    </div>
                    <div class="text-gray-400 text-center italic py-1.5" v-if="filteredItems.length === 0">
                        {{ searchable && term ? `No results for term "${term}"` : 'No items to display' }}
                    </div>
                </div>
            </template>
        </VMenu>
    </div>
</template>

<style scoped>

</style>
