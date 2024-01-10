<script setup lang="ts">
    import {type Ref, ref, watch} from 'vue';
    import VTextField from "@/components/VTextField.vue";
    import {useClickOutside} from "@/components/Composables/mouse";
    import VMenu from "@/components/VMenu/VMenu.vue";
    import VIcon from "@/components/VIcon.vue";

    interface Props {
        modelValue: string | null;
        label?: string;
        errorMessage?: string;
        color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        autofocus?: boolean;
        incrementMinutesAmount?: 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | null;
        absolute?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: null,
        label: '',
        errorMessage: '',
        color: 'primary',
        autofocus: false,
        incrementMinutesAmount: null,
        absolute: false,
    });

    const innerModelValue: Ref<string | null> = ref(props.modelValue);
    const focused: Ref<boolean> = ref(false);
    const hours: Ref<number> = ref(innerModelValue.value ? parseInt(innerModelValue.value.split(':')[0]) : 1);
    const stringHours: Ref<string> = ref(hours.value.toString().length <= 1 ? "0" + hours.value.toString() : hours.value.toString());
    const minutes: Ref<number> = ref(innerModelValue.value ? parseInt(innerModelValue.value.split(':')[1]) : 0);
    const stringMinutes: Ref<string> = ref(minutes.value.toString().length <= 1 ? "0" + minutes.value.toString() : minutes.value.toString());

    const focusInput = (): void => {
        focused.value = true;
    };

    const blurInput = (): void => {
        focused.value = false;
        timePickerActiveState.value = false;
        hours.value = parseInt(displayTime.value.split(':')[0]);
        minutes.value = parseInt(displayTime.value.split(':')[1]);
        convertTime();
    };

    interface Emits {
        (event: 'update:modelValue', data: string): void;
    }

    const emits = defineEmits<Emits>();

    const arrowClicked = () => {
        if (!focused.value) {
            focusInput();
        } else {
            blurInput();
        }
    };

    watch(
        () => hours.value + minutes.value,
        () => {
            emits('update:modelValue', `${stringHours.value}:${stringMinutes.value}`);
        }
    )

    const displayTime: Ref<string> = ref(innerModelValue ? `${stringHours.value}:${stringMinutes.value}` : '');

    const increaseTime = (val: string): void => {
        if (val === 'hours') {
            hours.value++;
            if (hours.value > 23) {
                hours.value = 0;
            }
        } else {
            if (!props.incrementMinutesAmount) {
                minutes.value++
            } else {
                minutes.value = minutes.value + props.incrementMinutesAmount;
            }
            if (minutes.value > 59) {
                minutes.value = 0;
            }
        }
        convertTime();
    }

    const decreaseTime = (val: string): void => {
        if (val === 'hours') {
            hours.value--
            if (hours.value < 0) {
                hours.value = 23;
            }
        } else {
            if (!props.incrementMinutesAmount) {
                minutes.value--
            } else {
                minutes.value = minutes.value - props.incrementMinutesAmount;
            }
            if (minutes.value < 0) {
                if (props.incrementMinutesAmount) {
                    minutes.value = 60 - props.incrementMinutesAmount;
                } else {
                    minutes.value = 59;
                }
            }
        }
        convertTime();
    }

    const convertTime = (): void => {
        if (hours.value.toString().length <= 1) {
            stringHours.value = '0' + hours.value.toString();
        } else {
            stringHours.value = hours.value.toString();
        }

        if (minutes.value.toString().length <= 1) {
            stringMinutes.value = '0' + minutes.value.toString();
        } else {
            stringMinutes.value = minutes.value.toString();
        }

        displayTime.value = `${stringHours.value}:${stringMinutes.value}`;
    }


    const validateInputTime = (event: KeyboardEvent) => {
        if (Number.isInteger(parseInt(event.key)) || (event.key === ':' && displayTime.value.indexOf(':') === -1) || event.key === 'Shift') {
            if (displayTime.value.length === 1 && parseInt(displayTime.value.slice(0, 1)) > 2) {
                displayTime.value = '';
            } else if (displayTime.value.length === 2 &&
                parseInt(displayTime.value.slice(0, 1)) === 2 &&
                parseInt(displayTime.value.slice(1, 2)) > 3 &&
                event.key !== ':') {
                displayTime.value = displayTime.value.slice(0, 1);
            } else if (displayTime.value.length === 2 &&
                displayTime.value.match(':') === null &&
                event.key !== ':') {
                displayTime.value = displayTime.value + ':';
            } else if (displayTime.value.length === displayTime.value.indexOf(':') + 2 &&
                parseInt(displayTime.value.slice(displayTime.value.length - 1, displayTime.value.length)) > 5 ||
                displayTime.value.slice(displayTime.value.indexOf(':') + 1, displayTime.value.length).length > 2) {
                displayTime.value = displayTime.value.slice(0, displayTime.value.length - 1);
            }
        } else {
            if (event.key !== 'Backspace') {
                displayTime.value = displayTime.value.slice(0, displayTime.value.length - 1);
            }
        }
    }

    const dropdownMenu: Ref<HTMLElement | null> = ref(null);
    const timePickerActiveState: Ref<boolean> = ref(false);

    useClickOutside(dropdownMenu, () => {
        if (timePickerActiveState.value) {
            blurInput();
        }
        if (focused.value) {
            timePickerActiveState.value = true;
        }
    });
</script>

<template>
    <div class="relative">
        <VMenu :close-on-content-click="false" width="w-fit" :position="props.absolute ? 'absolute' : 'bottom'">
            <template #trigger>
                <VTextField
                    @keyup="validateInputTime($event)"
                    ref="selectField"
                    :label="label"
                    :color="color"
                    :error-message="errorMessage"
                    :autofocus="autofocus"
                    v-model="displayTime"
                    @click="arrowClicked()"
                    @blur="blurInput()"
                >
                    <template #suffix>
                        <div class="transition-all duration-150" :class="{'rotate-180': focused}">
                            <VIcon icon="clock"
                                   :color="focused ? color : ''"
                                   :solid="focused"
                                   @click.stop="arrowClicked()"
                            />
                        </div>
                    </template>
                </VTextField>
            </template>
            <template #content>
                <div
                    class="flex justify-center items-center px-8 py-1.5 select-none active:bg-gray-50 cursor-pointer transition-all duration-75 text-xl text-gray-600 space-x-3">
                    <div class="flex flex-col w-10 items-center">
                        <VIcon icon="chevron-up"
                               class="rounded-full hover:bg-gray-600 hover:bg-opacity-20 transition-all duration-150 cursor-pointer"
                               :size="24"
                               @click="increaseTime('hours')"
                        />

                        <div>{{ stringHours }}</div>

                        <VIcon icon="chevron-down"
                               class="rounded-full hover:bg-gray-600 hover:bg-opacity-20 transition-all duration-150 cursor-pointer"
                               :size="24"
                               @click="decreaseTime('hours')"
                        />
                    </div>
                    <div>:</div>
                    <div class="flex flex-col w-10 items-center">
                        <VIcon icon="chevron-up"
                               class="rounded-full hover:bg-gray-600 hover:bg-opacity-20 transition-all duration-150 cursor-pointer"
                               :size="24"
                               @click="increaseTime('minutes')"
                        />

                        <div>{{ stringMinutes }}</div>

                        <VIcon icon="chevron-down"
                               class="rounded-full hover:bg-gray-600 hover:bg-opacity-20 transition-all duration-150 cursor-pointer"
                               :size="24"
                               @click="decreaseTime('minutes')"
                        />
                    </div>
                </div>
            </template>
        </VMenu>
    </div>
</template>

<style scoped>

</style>
