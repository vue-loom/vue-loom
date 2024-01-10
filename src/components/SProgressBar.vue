<script setup lang="ts">
    import {resolveBg, resolveStroke, resolveText} from "@/components/Partials/colors";
    import {computed, type ComputedRef, onMounted, ref, type Ref, watch} from "vue";

    interface Props {
        modelValue: number,
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        max?: number,
        type?: 'linear' | 'circular'
        radius?: number,
        width?: number,
        height?: number,
        textSize?: 'md' | 'xs' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
        dense?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: 0,
        color: 'primary',
        max: 100,
        type: 'linear',
        radius: 70,
        width: 12,
        height: 20,
        textSize: '4xl',
        dense: false,
    });

    const innerModelValue: Ref<number> = ref(props.modelValue);
    const circleRadius: Ref<number> = ref(props.radius);
    const circleWidth: Ref<number> = ref(props.width);
    const circleDimension: Ref<number> = ref(props.radius * 2);
    const circumference: Ref<number> = ref(0);
    const percentage: Ref<number> = ref(0);

    onMounted((): void => {
        calculateProgress(innerModelValue.value);
    });

    watch(() => props.modelValue, (value: number): void => {
        calculateProgress(value);
    });

    const calculateProgress = (value: number): void => {
        percentage.value = Math.round((value / props.max) * 100);
        if (percentage.value > 100) {
            percentage.value = 100;
        }
        if (props.type === 'linear') {
            innerModelValue.value = percentage.value;
        } else {
            circumference.value = 2 * Math.PI * circleRadius.value
            innerModelValue.value = circumference.value * ((104.5 - percentage.value) / 100);
        }
    }

    const circularTextClassObject: ComputedRef<object> = computed(() => ({
        'text-4xl': props.textSize === '4xl',
        'text-3xl': props.textSize === '3xl',
        'text-2xl': props.textSize === '2xl',
        'text-xl': props.textSize === 'xl',
        'text-sm': props.textSize === 'sm',
        'text-xs': props.textSize === 'xs',
        [`${resolveText(props.color)}`]: props.color,
    }));

</script>

<template>
    <div>
        <div v-if="type === 'linear'" class="relative rounded-full overflow-hidden w-full">
            <div class="bg-black opacity-10" :style="{height: props.dense ? '3px' : `${height}px`}"></div>
            <div class="absolute top-0 rounded-full transition-all duration-300 ease-in-out" :class="resolveBg(color)"
                 :style="{width: `${innerModelValue}%`, height: props.dense ? '3px' : `${height}px`}"></div>
            <div v-if="!dense" class="absolute top-0 left-[49%] flex justify-center items-center"
                 :class="`text-${innerModelValue > 49 ? 'white' : ''}`"
                 :style="{height: `${height}px`}"
            >{{ innerModelValue }}%
            </div>
        </div>
        <div v-else class="relative flex justify-center items-center font-bold"
             :style="{maxWidth: `${circleDimension}px`, maxHeight: `${circleDimension}px`}">
            <svg
                :width="circleDimension"
                :height="circleDimension"
                :viewBox="`0 0 ${circleDimension} ${circleDimension}`"
                style="transform: rotate(-90deg)">
                <circle :r="circleRadius-(circleWidth/2)"
                        :cx="circleRadius"
                        :cy="circleRadius"
                        fill="transparent"
                        stroke="#e0e0e0"
                        :stroke-width="`${circleWidth}px`"
                ></circle>
                <circle class="transition-all duration-300 ease-in-out"
                        :class="[resolveStroke(color)]"
                        :r="circleRadius-(circleWidth/2)"
                        :cx="circleRadius"
                        :cy="circleRadius"
                        fill="transparent"
                        stroke-linecap="round"
                        :stroke-width="`${circleWidth}px`"
                        :stroke-dasharray="`${circumference}px`"
                        :stroke-dashoffset="`${innerModelValue}px`"
                ></circle>
            </svg>
            <div class="absolute font-bold" :class="circularTextClassObject">{{ percentage }}</div>
        </div>
    </div>
</template>

<style scoped>

</style>
