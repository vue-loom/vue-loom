import {ref} from "vue";

const isOpen = ref<boolean>(false);

export const useAppMenu = () => {
    const toggle = (): void => {
        isOpen.value = !isOpen.value;
    };

    return {
        isOpen: isOpen.value,
        toggle,
    };
};