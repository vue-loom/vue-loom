<script setup lang="ts">
    import {onMounted, type Ref, ref, watch} from "vue";
    import dayjs from "dayjs";
    import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/outline";
    import {resolveBg, resolveText} from "@/partials/colors";

    interface Props {
        modelValue: string | null,
        color?: string,
        allowedDates?: string[],
        disableDates?: string[],
        min?: string,
        max?: string,
        elevation?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: null,
        color: 'primary',
        allowedDates: () => ([]),
        disableDates: () => ([]),
        min: '',
        max: '',
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
        if ((props.allowedDates.length > 0 && !validDates.value.includes(day)) ||
            (props.disableDates.length > 0 && disabledDatesList.value.includes(day)) ||
            (fromDate.value !== null && (day <= fromDate.value || fromDate.value === 0)) ||
            (toDate.value !== null && (day >= toDate.value || toDate.value === 0))) {
            return;
        }
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

    onMounted(() => {
        getAllowedDates();
        getDisableDates();
        getMinDate();
        getMaxDate();
    });

    watch(() => month.value, () => {
        getAllowedDates();
        getDisableDates();
        getMinDate();
        getMaxDate();
    });

    watch(() => year.value, () => {
        getAllowedDates();
        getDisableDates();
        getMinDate();
        getMaxDate();
    });

    const innerAllowedDates: Ref<string[]> = ref(props.allowedDates);

    watch(() => props.allowedDates, () => {
        innerAllowedDates.value = props.allowedDates;
        getAllowedDates();
    })

    const validDates: Ref<number[]> = ref([]);

    const getAllowedDates = (): void => {
        validDates.value = [];
        if (innerAllowedDates.value.length > 0) {
            innerAllowedDates.value.forEach((value) => {
                let date = dayjs(value).format('YYYY-MM-DD');
                if (date !== 'Invalid Date') {
                    if (parseInt(date.split('-')[0]) === year.value && parseInt(date.split('-')[1]) === month.value + 1) {
                        validDates.value.push(parseInt(date.split('-')[2]));
                    }
                } else {
                    console.warn(`Invalid date format provided - ${value}. Try the following format "YYYY-MM-DD".`);
                }
            })
        }
    }

    const innerDisabledDates: Ref<string[]> = ref(props.disableDates);

    watch(() => props.disableDates, () => {
        innerDisabledDates.value = props.disableDates;
        getDisableDates();
    })

    const disabledDatesList: Ref<number[]> = ref([]);

    const getDisableDates = (): void => {
        disabledDatesList.value = [];
        if (innerDisabledDates.value.length > 0) {
            innerDisabledDates.value.forEach((value) => {
                let date = dayjs(value).format('YYYY-MM-DD');
                if (date !== 'Invalid Date') {
                    if (parseInt(date.split('-')[0]) === year.value && parseInt(date.split('-')[1]) === month.value + 1) {
                        disabledDatesList.value.push(parseInt(date.split('-')[2]));
                    }
                } else {
                    console.warn(`Invalid date format provided - ${value}. Try the following format "YYYY-MM-DD".`);
                }
            })
        }
    }

    const innerMinDates: Ref<string> = ref(props.min);

    watch(() => props.min, () => {
        innerMinDates.value = props.min;
        getMinDate();
    })

    const fromDate: Ref<number | null> = ref(null);

    const getMinDate = (): void => {
        fromDate.value = null;
        if (innerMinDates.value !== '') {
            let date = dayjs(innerMinDates.value).format('YYYY-MM-DD');
            if (date !== 'Invalid Date') {
                if (parseInt(date.split('-')[0]) === year.value && parseInt(date.split('-')[1]) === month.value + 1) {
                    fromDate.value = parseInt(date.split('-')[2]);
                } else if (year.value < parseInt(date.split('-')[0]) || month.value + 1 < parseInt(date.split('-')[1])) {
                    fromDate.value = 0;
                }
            } else {
                console.warn(`Invalid date format provided - ${innerMinDates.value}. Try the following format "YYYY-MM-DD".`);
            }
        }
    }

    const innerMaxDates: Ref<string> = ref(props.max);

    watch(() => props.max, () => {
        innerMaxDates.value = props.max;
        getMaxDate();
    })

    const toDate: Ref<number | null> = ref(null);

    const getMaxDate = (): void => {
        toDate.value = null;
        if (innerMaxDates.value !== '') {
            let date = dayjs(innerMaxDates.value).format('YYYY-MM-DD');
            if (date !== 'Invalid Date') {
                if (parseInt(date.split('-')[0]) === year.value && parseInt(date.split('-')[1]) === month.value + 1) {
                    toDate.value = parseInt(date.split('-')[2]);
                } else if (year.value > parseInt(date.split('-')[0]) || month.value + 1 > parseInt(date.split('-')[1])) {
                    fromDate.value = 0;
                }
            } else {
                console.warn(`Invalid date format provided - ${innerMaxDates.value}. Try the following format "YYYY-MM-DD".`);
            }
        }
    }

    const dayClassObject = (day: number): object => ({
        [`${resolveText(props.color)} ${resolveBg(props.color)} bg-opacity-10`]: isToday(day),
        [`text-white font-bold ${resolveBg(props.color)}`]: isSelected(day),
        'hover:bg-gray-100': !isToday(day) && !isSelected(day),
        'text-gray-400 !cursor-default': (props.allowedDates.length > 0 && !validDates.value.includes(day)) ||
            (props.disableDates.length > 0 && disabledDatesList.value.includes(day)) ||
            (fromDate.value !== null && (day <= fromDate.value || fromDate.value === 0)) ||
            (toDate.value !== null && (day >= toDate.value || toDate.value === 0)),
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
