<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, type Ref, ref} from 'vue';
    import {resolveText, resolveRing, resolveBorder} from "@/components/Partials/colors";
    import STreeNode from "@/components/Tree/Partials/VTreeNode.vue";
    import {watch} from "vue";
    import VMenu from "@/components/VMenu.vue";
    import {useClickOutside} from "@/components/Composables/mouse";
    import SIcon from "@/components/VIcon.vue";

    interface Props {
        modelValue: number | string | null;
        items: TreeItem[];
        itemValue?: string;
        itemName?: string;
        label?: string;
        errorMessage?: string,
        color?: string;
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

    const innerModelValue: Ref<number | string | null> = ref(props.modelValue);
    const innerErrorMessage: Ref<string> = ref(props.errorMessage);
    const focused: Ref<boolean> = ref(false);
    const term: Ref<string> = ref('');

    const updateTerm = (payload: Event): string => term.value = (payload.target as HTMLElement).innerText;

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

    const disableNewLine = (event: KeyboardEvent) => {
        (event.target as HTMLTextAreaElement).blur();
    };

    const findSelectedItem = () => {
        if (innerModelValue.value) {
            return findItemFromInnerValue(props.items, innerModelValue.value);
        }

        return null;
    };

    const selectedItem: Ref<TreeItem | null> = ref(findSelectedItem());

    const displayName: ComputedRef<string> = computed(() => selectedItem.value ? selectedItem.value.name : '');

    const inputClassObject: ComputedRef<object> = computed(() => ({
        [resolveBorder(props.color)]: focused.value,
        'border-gray-300': !focused.value,
        '!border-danger': innerErrorMessage.value,
    }));

    interface Open {
        [key: number]: boolean,
    }

    const open: Ref<Open> = ref({});

    const parseTreeNode = (item: TreeItem): TreeNode => ({
        id: item.id,
        name: item.name,
        children: item.children
            .filter(({name, children}) => children.length > 0 || name.toLowerCase().includes(term.value.toLowerCase()))
            .map((item: TreeItem) => parseTreeNode(item)),
        selected: innerModelValue.value === item.id,
        expanded: open.value[item.id] || false,
    });

    const parsedNodes: ComputedRef<TreeNode[]> = computed(() => props.items
        .filter(({name, children}) => children.length > 0 || name.toLowerCase().includes(term.value.toLowerCase()))
        .map((item: TreeItem) => parseTreeNode(item)));

    const toggleNodeOpenState = (node: TreeNode): void => {
        if (open.value.hasOwnProperty(node.id)) {
            open.value[node.id] = !open.value[node.id];
        } else {
            open.value[node.id] = true;
        }
    };

    interface Emits {
        (event: 'update:modelValue', data: number | string | null): void;
    }

    const emits = defineEmits<Emits>();

    const findItemFromInnerValue = (items: TreeItem[], value: number | string | null): TreeItem | null => {
        for (const item of items) {
            if (item.id === value) {
                return item;
            }

            if (item.children.length > 0) {
                let result: TreeItem | null = findItemFromInnerValue(item.children, value);

                if (result) {
                    return result;
                }
            }
        }

        return null;
    };

    const findItem = (items: TreeItem[], node: TreeNode): TreeItem | null => {
        return findItemFromInnerValue(items, node.id);
    };

    watch((): number | string | null => props.modelValue, (value: number | string | null): void => {
        innerModelValue.value = value;

        selectedItem.value = findSelectedItem();
    });

    watch((): string => props.errorMessage, (value): void => {
        innerErrorMessage.value = value;
    });

    const selectItem = (node: TreeNode): void => {
        innerErrorMessage.value = '';
        selectedItem.value = findItem(props.items, node);

        if (selectedItem.value) {
            innerModelValue.value = selectedItem.value.id;
        }

        emits('update:modelValue', innerModelValue.value);
    }
</script>

<template>
    <div class="relative">
        <VMenu width="w-full" :close-on-content-click="false">
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

                <div class="pt-0.5 pl-1 text-red-600 text-xs" v-if="innerErrorMessage">
                    {{ innerErrorMessage }}
                </div>
            </template>
            <template #content>
                <div ref="dropdownMenu"
                     class="overflow-y-auto py-2"
                     :class="[
                         resolveRing(color),
                         items.length > 0 ? 'max-h-56' : '',
                     ]"
                >
                    <STreeNode
                        :node="node"
                        :color="color"
                        :key="node.id"
                        v-for="(node) in parsedNodes"
                        @node:select="selectItem"
                        @node:expand="toggleNodeOpenState"
                    />

                    <div class="text-gray-400 text-center italic" v-if="items.length === 0">
                        {{ searchable && term ? `No results for term "${term}"` : 'No items to display' }}
                    </div>
                </div>
            </template>
        </VMenu>
    </div>
</template>

<style scoped>

</style>
