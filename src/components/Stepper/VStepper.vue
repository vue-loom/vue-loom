<script setup lang="ts">
    import {ref, type Ref, computed, type ComputedRef, onMounted, watch, type Component} from "vue";

    interface Props {
        modelValue?: number;
        elevation?: boolean;
        clickable?: boolean;
        preserveState?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: 0,
        elevation: false,
        clickable: false,
        preserveState: false,
    });

    interface Emits {
        (event: 'update:modelValue', data: number): void;
    }

    const emits = defineEmits<Emits>();

    const innerModelValue: Ref<number> = ref(props.modelValue);

    // console.log(useSlots().default());
    // const steps: VNodeNormalizedChildren = useSlots().default();

    interface Step {
        children: {
            step(): Component[];
            content(): Component[];
        };
    }

    interface Slot {
        default(): Step[];
    }

    const slots = defineSlots<Slot>();
    const steps: Step[] = slots.default();

    const stepHeaders: Component[] = steps.map((step) => step.children.step()[0]);
    const stepContentSections: Component[] = steps.map((step) => step.children.content()[0]);

    const labelRefs: Ref<HTMLElement[]> = ref([]);
    const contentRefs: Ref<HTMLElement[]> = ref([]);
    const contentHeight: Ref<number> = ref(0);
    const headerHeight: Ref<number> = ref(0);
    const headerRef: Ref<HTMLElement | null> = ref(null);

    onMounted((): void => {
        if (localStorage.step && props.preserveState) {
            innerModelValue.value = localStorage.step
        }

        if (headerRef.value) {
            headerHeight.value = headerRef.value.getBoundingClientRect().height;
        }
        contentHeight.value = Math.max(...contentRefs.value.map((contentEl: HTMLElement) => contentEl.getBoundingClientRect().height)) + headerHeight.value;
    });

    watch((): number => innerModelValue.value, (value: number): void => {
        if (props.preserveState) {
            localStorage.step = value;
        }
    });

    const selectStep = (index: number): void => {
        if (props.clickable) {
            innerModelValue.value = index;

            emits('update:modelValue', innerModelValue.value);
        }
    }

    const frameClassObject: ComputedRef<object> = computed(() => ({
        'shadow-xl': props.elevation,
    }));

    const contentClassObject = (index: number) => ({
        'translate-x-0': index === innerModelValue.value,
        'translate-x-full': index > innerModelValue.value,
        '-translate-x-full': index < innerModelValue.value,
    });

</script>

<template>
    <div class="overflow-hidden relative rounded-lg bg-white" :class="frameClassObject"
         :style="{height: `${contentHeight}px`}">
        <div ref="headerRef" class="flex shadow-md">
            <div ref="labelRefs"
                 v-for="(stepHeader, index) in stepHeaders"
                 :key="index"
                 class="relative text-center overflow-hidden w-fit grow select-none transition-all duration-150"
            >
                <div class="relative flex justify-center items-center">
                    <div class="absolute h-1/2 w-1/2 left-0 top-0 border-b border-gray-300"
                         v-if="index !== 0"
                    ></div>
                    <div class="bg-white w-fit z-10 p-2"
                         :class="clickable ? 'cursor-pointer hover:bg-gray-100' : ''"
                         @click="selectStep(index)">
                        <component :is="stepHeader"></component>
                    </div>
                    <div class="absolute h-1/2 w-1/2 right-0 top-0 border-b border-gray-300"
                         v-if="index !== stepHeader.length - 1"
                    ></div>
                </div>
            </div>
        </div>
        <div ref="contentRefs"
             class="p-2 absolute w-full transition-all duration-300 ease-in-out"
             :class="contentClassObject(index)"
             v-if="stepContentSections"
             v-for="(stepContent, index) in stepContentSections"
             :key="index"
        >
            <component :is="stepContent"></component>
        </div>
    </div>
</template>

<style scoped>

</style>
