import {type Ref, ref, toValue} from "vue";

interface Params {
    title?: string;
    subtitle: string;
    duration?: number;
    color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
    type?: 'info' | 'warning' | 'error' | 'success',
    position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
    rounded?: boolean,
}

interface Toast {
    value: boolean;
    title: string;
    subtitle: string;
    duration?: number;
    color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
    type?: 'info' | 'warning' | 'error' | 'success',
    position?: 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';
    rounded?: boolean,
    show: (params: Params) => void;
    hide: () => void;
}

const toast: Ref<Toast> = ref({
    value: false,
    title: 'Notification',
    subtitle: '',
    duration: 3000,
    color: 'bg-gray-700',
    type: 'info',
    position: 'top-right',
    rounded: true,
    show: (params: Params): void => {
        toast.value.title = params.title || toast.value.type;
        toast.value.subtitle = params.subtitle || toast.value.subtitle;
        toast.value.duration = params.duration || toast.value.duration;
        toast.value.color = params.color || toast.value.color;
        toast.value.type = params.type || toast.value.type;
        toast.value.position = params.position || toast.value.position;
        toast.value.rounded = params.rounded || toast.value.rounded;
        toast.value.value = true;

        if (toast.value.duration && typeof toast.value.duration === 'number' && toast.value.duration !== 0) {
            setTimeout(() => {
                toast.value.value = false;
            }, toast.value.duration);
        }
    },
    hide: (): void => {
        toast.value.value = false;
    },
});

export const useToast = (): Toast => {
    return toValue(toast);
}
