<script setup lang="ts">
    import {ref, type Ref, computed, type ComputedRef, onMounted, type Component, watch} from "vue";
    import {getContrastColorClass, resolveBg} from "@/partials/colors";

    interface Props {
        modelValue?: number,
        readonly?: boolean,
        disabled?: boolean,
        elevation?: boolean,
        alignTabs?: 'start' | 'center' | 'end',
        growTabs?: boolean,
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        preserveState?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: 0,
        readonly: false,
        disabled: false,
        elevation: false,
        alignTabs: 'start',
        growTabs: false,
        color: 'primary',
        preserveState: false,
    });

    const innerModelValue: Ref<number> = ref(props.modelValue);

    interface Tab {
        children: {
            tab(): Component[];
            content(): Component[];
        };
    }

    interface Slot {
        default(): Tab[];
    }

    const slots = defineSlots<Slot>();
    const tabs: Tab[] = slots.default();

    let tabHeaders: Component[];
    let tabContentSections: Component[];

    const setTabSlots = (): void => {
        if (Array.isArray(tabs[0].children)) {
            tabHeaders = tabs[0].children.map((child) => child.children.tab()[0]);
            tabContentSections = tabs[0].children.map((child) => child.children.content()[0]);
        } else {
            tabHeaders = tabs.map((step) => step.children.tab()[0]);
            tabContentSections = tabs.map((step) => step.children.content()[0]);
        }
    };

    setTabSlots();

    watch((): number => props.modelValue, (val): void => {
        innerModelValue.value = val;

        setTabSlots();
    });

    const labelRefs: Ref<HTMLElement[]> = ref([]);
    const contentRefs: Ref<HTMLElement[]> = ref([]);
    const contentHeight: Ref<number> = ref(0);
    const headerHeight: Ref<number> = ref(0);
    const headerRef: Ref<HTMLElement | null> = ref(null);

    onMounted((): void => {
        if (sessionStorage.getItem('vue_loom_tabs_tab') && props.preserveState) {
            innerModelValue.value = parseInt(sessionStorage.getItem('vue_loom_tabs_tab') || '0');
        }

        if (headerRef.value) {
            headerHeight.value = headerRef.value.getBoundingClientRect().height;
        }
        contentHeight.value = Math.max(...contentRefs.value.map((contentEl: HTMLElement) => contentEl.getBoundingClientRect().height)) + headerHeight.value;
    });

    watch((): number => innerModelValue.value, (value: number): void => {
        if (props.preserveState) {
            sessionStorage.setItem('vue_loom_tabs_tab', value.toString());
        }

        setTabSlots();
    });

    interface Emits {
        (event: 'update:modelValue', data: number): void;
    }

    const emits = defineEmits<Emits>();

    const selectTab = (index: number): void => {
        innerModelValue.value = index;

        emits('update:modelValue', innerModelValue.value);
    }

    const frameClassObject: ComputedRef<object> = computed(() => ({
        'shadow-md': props.elevation,
    }));

    const tabClassObject = (): object => ({
        [`${resolveBg(props.color)} text-${getContrastColorClass(props.color)}`]: props.color,
        'grow': props.growTabs,
    });

    const contentClassObject = (index: number): object => ({
        'translate-x-0': index === innerModelValue.value,
        'translate-x-full': index > innerModelValue.value,
        '-translate-x-full': index < innerModelValue.value,
    });

    const headerClassObject: ComputedRef<object> = computed(() => ({
        [`${resolveBg(props.color)}`]: props.color,
        'justify-start': props.alignTabs === 'start',
        'justify-center': props.alignTabs === 'center',
        'justify-end': props.alignTabs === 'end',
    }));

</script>

<template>
    <div class="overflow-hidden relative rounded-lg bg-white" :class="frameClassObject"
         :style="{height: `${contentHeight}px`}">
        <div ref="headerRef" class="flex" :class="headerClassObject">
            <div ref="labelRefs"
                 v-for="(tabHeader, index) in tabHeaders"
                 :key="index"
                 class="relative text-center overflow-hidden w-fit cursor-pointer select-none transition-all duration-150"
                 :class="[tabClassObject(), `hover:bg-${getContrastColorClass(props.color)}/10`]"
                 @click="selectTab(index)">
                <div class="p-2">
                    <component :is="tabHeader"></component>
                </div>
                <transition
                    enter-active-class="transition-all duration-300"
                    enter-from-class="scale-x-0"
                    enter-to-class="scale-x-100"
                    leave-active-class="transition-all duration-300"
                    leave-from-class="scale-x-100"
                    leave-to-class="scale-x-0"
                >
                    <div class="h-0.5 w-full bg-white" v-if="index === innerModelValue"></div>
                </transition>
            </div>
        </div>
        <div ref="contentRefs"
             class="p-2 absolute w-full transition-all duration-300 ease-in-out"
             :class="contentClassObject(index)"
             v-for="(tabContent, index) in tabContentSections"
             :key="index"
        >
            <component :is="tabContent"></component>
        </div>
    </div>
</template>

<style scoped>

</style>
