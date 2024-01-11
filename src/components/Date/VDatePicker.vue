<script setup lang="ts">
    import {type Ref, ref} from "vue";
    import dayjs from "dayjs";
    import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline";
    import {resolveBg, resolveText} from "@/partials/colors";

    interface Props {
        modelValue: string | null,
        color?: string,
        allowedDates?: number[] | string[],
        min?: string,
        max?: string,
        elevation?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: null,
        color: 'primary',
        min: '',
        max: '',
        allowedDates: () => [],
        elevation: false,
    });

    interface Emits {
        (event: 'update:modelValue', data: string): void;
    }

    const emits = defineEmits<Emits>();

    const innerModelValue: Ref<string> = ref(props.modelValue || dayjs().format('YYYY-MM-DD'));
    const year: Ref<number> = ref(dayjs().year());
    const month: Ref<number> = ref(dayjs().month());
    const months: Ref<string[]> = ref([
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]);
    const days: Ref<string[]> = ref([
        "S", "M", "T", "W", "T", "F", "S"
    ]);

    const dateSelected = (day: number): void => {
        innerModelValue.value = dayjs(`${year.value}-${month.value + 1}-${day}`).format('YYYY-MM-DD');
        emits('update:modelValue', innerModelValue.value);
    }

    const increaseYear = (): void => {
        year.value++;
    }

    const decreaseYear = (): void => {
        year.value--;
    }

    const increaseMonth = (): void => {
        month.value++;
        if (month.value > 11) {
            month.value = 0;
        }
    }

    const decreaseMonth = (): void => {
        month.value--;
        if (month.value < 0) {
            month.value = 11;
        }
    }

    const getDate = (day: number): string => {
        return `${year.value}-${month.value + 1}-${day}`
    }

    const isToday = (day: number): boolean => {
        return dayjs().isSame(dayjs(getDate(day)), 'day')
            && !dayjs(innerModelValue.value).isSame(dayjs(getDate(day)), 'day');
    };

    const isSelected = (day: number): boolean => {
        return dayjs(innerModelValue.value).isSame(dayjs(getDate(day)), 'day');
    };

    const dayClassObject = (day: number): object => ({
        [`${resolveText(props.color)} ${resolveBg(props.color)} bg-opacity-10`]: isToday(day),
        [`text-white font-bold ${resolveBg(props.color)}`]: isSelected(day),
        'hover:bg-gray-100': !isToday(day) && !isSelected(day),
    });
</script>

<template>
    <div class="w-fit select-none" :class="[props.elevation ? 'shadow-xl rounded-lg overflow-hidden' : '']">
        <div class="p-2" :class="[resolveBg(color)]">
            <div class="text-sm text-white">SELECT DATE</div>
            <div class="text-3xl text-white">
                {{ innerModelValue ? dayjs(innerModelValue).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD') }}
            </div>
        </div>

        <div class="p-2">
            <div class="grid grid-cols-2">
                <div class="col-span-1 flex space-x-2 text-start items-center">
                    <ChevronLeftIcon
                        class="h-4 w-4 rounded-full hover:bg-gray-200 cursor-pointer"
                        @click="decreaseMonth()"
                    />
                    <div class="w-16 flex justify-center select-none">{{ months[month] }}</div>
                    <ChevronRightIcon
                        class="h-4 w-4 rounded-full hover:bg-gray-200 cursor-pointer"
                        @click="increaseMonth()"
                    />
                </div>
                <div class="col-span-1 flex space-x-2 justify-end items-center">
                    <ChevronLeftIcon
                        class="h-4 w-4 rounded-full hover:bg-gray-200 cursor-pointer"
                        @click="decreaseYear()"
                    />
                    <div class="w-7 flex justify-center select-none">{{ year }}</div>
                    <ChevronRightIcon
                        class="h-4 w-4 rounded-full hover:bg-gray-200 cursor-pointer"
                        @click="increaseYear()"
                    />
                </div>
            </div>

            <div class="grid grid-cols-7 gap-2 text-center">
                <div class="font-bold" :key="day" v-for="(day) in days">{{ day }}</div>
                <div :key="openDay"
                     v-if="dayjs(getDate(1)).day() > 0"
                     v-for="(openDay) in dayjs(`${year}-${month+1}-01`).day()"
                />
                <div
                    v-for="(dayInMonth) in dayjs().month(month).daysInMonth()"
                    class="w-7 h-7 flex justify-center items-center cursor-pointer rounded-full transition-all duration-150"
                    :class="dayClassObject(dayInMonth)"
                    @click="dateSelected(dayInMonth)"
                >
                    <div>{{ dayInMonth }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
