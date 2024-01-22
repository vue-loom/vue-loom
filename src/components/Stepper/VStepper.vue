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

    const innerModelValue: Ref<number> = ref(props.modelValue);

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

    let stepHeaders: Component[];
    let stepContentSections: Component[];

    const setStepperSlots = (): void => {
        if (Array.isArray(steps[0].children)) {
            stepHeaders = steps[0].children.map((child) => child.children.step()[0]);
            stepContentSections = steps[0].children.map((child) => child.children.content()[0]);
        } else {
            stepHeaders = steps.map((step) => step.children.step()[0]);
            stepContentSections = steps.map((step) => step.children.content()[0]);
        }
    };

    setStepperSlots();

    watch((): number => props.modelValue, (val): void => {
        innerModelValue.value = val;

        setStepperSlots();
    });

    const labelRefs: Ref<HTMLElement[]> = ref([]);
    const contentRefs: Ref<HTMLElement[]> = ref([]);
    const contentHeight: Ref<number> = ref(0);
    const headerHeight: Ref<number> = ref(0);
    const headerRef: Ref<HTMLElement | null> = ref(null);

    onMounted((): void => {
        if (sessionStorage.getItem('vue_loom_stepper_step') && props.preserveState) {
            innerModelValue.value = parseInt(sessionStorage.getItem('vue_loom_stepper_step') || '0');
        }

        if (headerRef.value) {
            headerHeight.value = headerRef.value.getBoundingClientRect().height;
        }

        contentHeight.value = Math.max(...contentRefs.value.map((contentEl: HTMLElement) => contentEl.getBoundingClientRect().height)) + headerHeight.value;
    });

    watch((): number => innerModelValue.value, (value: number): void => {
        if (props.preserveState) {
            sessionStorage.setItem('vue_loom_stepper_step', value.toString());
        }

        setStepperSlots();
    });

    interface Emits {
        (event: 'update:modelValue', data: number): void;
    }

    const emits = defineEmits<Emits>();

    const selectStep = (index: number): void => {
        if (props.clickable) {
            innerModelValue.value = index;

            emits('update:modelValue', innerModelValue.value);
        }
    }

    const frameClassObject: ComputedRef<object> = computed(() => ({
        'shadow-md': props.elevation,
    }));

    const contentClassObject = (index: number) => ({
        'translate-x-0': index === innerModelValue.value,
        'translate-x-full': index > innerModelValue.value,
        '-translate-x-full': index < innerModelValue.value,
    });

</script>

<template>
    <div class="overflow-hidden relative rounded-lg bg-white"
         :style="{height: `${contentHeight}px`}"
         :class="frameClassObject"
    >
        <div ref="headerRef" class="flex shadow-md">
            <div ref="labelRefs"
                 v-for="(stepHeader, index) in stepHeaders"
                 :key="index"
                 class="relative text-center overflow-hidden w-fit grow select-none transition-all duration-150"
            >
                <div class="relative flex justify-center h-full">
                    <div class="absolute h-1/2 w-1/2 left-0 top-0 border-b border-gray-300"
                         v-if="index !== 0"
                    ></div>
                    <div class="bg-white w-fit z-10 p-2 h-full flex justify-center items-center"
                         :class="clickable ? 'cursor-pointer hover:bg-gray-100' : ''"
                         @click="selectStep(index)"
                    >
                        <component :is="stepHeader"></component>
                    </div>
                    <div class="absolute h-1/2 w-1/2 right-0 top-0 border-b border-gray-300"
                         v-if="index !== stepHeaders.length - 1"
                    ></div>
                </div>
            </div>
        </div>
        <div ref="contentRefs"
             class="absolute w-full transition-all duration-300 ease-in-out"
             :class="contentClassObject(index)"
             :key="index"
             v-if="stepContentSections"
             v-for="(stepContent, index) in stepContentSections"
        >
            <component :is="stepContent"></component>
        </div>
    </div>
</template>

<style scoped>

</style>
