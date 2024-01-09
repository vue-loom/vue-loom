<script setup lang="ts">
    import {ref, type Ref, useSlots, computed, type ComputedRef, onMounted} from "vue";
    import {type VNodeNormalizedChildren} from "@vue/runtime-core";
    import {getContrastColorClass, resolveBg} from "@/components/Partials/colors";

    interface Props {
        modelValue?: number;
        readonly?: boolean;
        disabled?: boolean;
        elevation?: boolean;
        alignTabs?: 'start' | 'center' | 'end'
        growTabs?: boolean,
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: 0,
        readonly: false,
        disabled: false,
        elevation: false,
        alignTabs: 'start',
        growTabs: false,
        color: 'primary'
    });

    interface Emits {
        (event: 'update:modelValue', data: number);
    }

    const emits = defineEmits<Emits>();

    const innerModelValue: Ref<number> = ref(props.modelValue);

    const tabs: VNodeNormalizedChildren = useSlots().default();
    const tabLabels = tabs.map((tab) => tab.children.tab().at(0).children.toString().trim());
    const tabContentSections = tabs.map((tab) => tab.children.content().at(0));

    const labelRefs = ref([]);
    const contentRefs = ref([]);
    const contentHeight: Ref<number> = ref(0);
    const headerHeight: Ref<number> = ref(0);
    const headerRef: Ref<HTMLElement | null> = ref(null);

    const contentWidth: Ref<number> = ref(0);
    const headerWidth: Ref<number> = ref(0);

    onMounted(() => {
            headerHeight.value = headerRef.value.getBoundingClientRect().height;
            contentHeight.value = Math.max(...contentRefs.value.map((contentEl: HTMLElement) => contentEl.getBoundingClientRect().height)) + headerHeight.value;
    });

    const selectTab = (index: number, event: MouseEvent) => {
        innerModelValue.value = index;
        createRipple(index, event);

        emits('update:modelValue', innerModelValue.value);
    }

    // const tabRef: Ref<HTMLElement | null> = ref(null);

    const createRipple = (index: number, event: MouseEvent) => {
        // console.log(contentRefs)
        // useRipple(event, contentRefs);
    }

    const frameClassObject: ComputedRef<object> = computed(() => ({
        'shadow-xl': props.elevation,
    }));

    const tabClassObject = (index: number) => ({
        [`${resolveBg(props.color)} text-${getContrastColorClass(props.color)}`]: props.color,
        'grow': props.growTabs,
    });

    const contentClassObject = (index: number) => ({
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
    <div class="overflow-hidden relative rounded-lg bg-white" :class="frameClassObject" :style="{height: `${contentHeight}px`}">
        <div ref="headerRef" class="flex" :class="headerClassObject">
            <div ref="labelRefs"
                 v-for="(tabLabel, index) in tabLabels"
                 :key="index"
                 class="relative text-center overflow-hidden w-fit cursor-pointer select-none transition-all duration-150"
                 :class="[tabClassObject(index), `hover:bg-${getContrastColorClass(props.color)}/10`]"
                 @click="selectTab(index, $event)">
                <div class="py-2 px-4">{{ tabLabel }}</div>
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
