<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, type Ref, ref, type StyleValue} from "vue";
    import {resolveBg} from "@/partials/colors";
    import {VLoader} from "@";

    interface Props {
        src: string;
        aspectRatio?: 'auto' | 'square' | 'video' | null;
        width?: number | string | null;
        height?: number | string | null;
        noRepeat?: boolean;
        blur?: boolean | 'sm' | 'md' | 'lg' | 'xl' | null;
        color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | null;
    }

    const props = withDefaults(defineProps<Props>(), {
        aspectRatio: null,
        width: null,
        height: null,
        noRepeat: false,
        blur: false,
        color: null,
    });

    const validateProps = (): void => {
        if (!props.src) {
            console.warn('When using "VImage", a valid "src" is required.');
        }

        if (props.aspectRatio && (props.width && props.height)) {
            console.warn('When using the "aspect-ratio" prop, only either the "width" or the "height" prop should be used, not both.');
        }
    };

    const getImageRef = (): string => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

        return `image_${chars.split('').reduce((carry) => carry + chars.charAt(Math.floor(Math.random() * chars.length)), '')}`;
    }

    const imageId: string = getImageRef();
    let image: HTMLElement | null = null;
    const imageWidth: Ref<string | null> = ref(null);
    const imageHeight: Ref<string | null> = ref(null);

    const setImage = (): void => {
        image = document.getElementById(imageId);

        setTimeout(() => {
            if (image) {
                imageWidth.value = getComputedStyle(image).width || null;
                imageHeight.value = getComputedStyle(image).height || null;
            }
        }, 0);
    };

    const loading: Ref<boolean> = ref(false);

    const manageLoadingState = () => {
        if (image) {
            loading.value = true;

            image.onload = () => {
                loading.value = false;
            };
        }
    };

    onMounted((): void => {
        validateProps();
        setImage();
        manageLoadingState();
    });

    const parsedAspectRatio = computed(() => {
        switch (props.aspectRatio) {
            case 'square':
                return 'aspect-square';
            case 'video':
                return 'aspect-video';
            case 'auto':
                return 'aspect-auto';
            default:
                return '';
        }
    });

    const parsedBlur = computed(() => {
        switch (props.blur) {
            case 'sm':
                return 'backdrop-blur-sm';
            case 'md':
                return 'backdrop-blur-md';
            case 'lg':
                return 'backdrop-blur-lg';
            case 'xl':
                return 'backdrop-blur-xl';
            case false:
                return 'backdrop-blur-none';
            default:
                return 'backdrop-blur';
        }
    });

    const imageClassObject: ComputedRef<object> = computed(() => ({
        [parsedAspectRatio.value]: props.aspectRatio,
    }));

    const imageStyleObject: ComputedRef<StyleValue> = computed(() => ({
        width: props.width ? `${props.width}px` : '',
        height: props.height ? `${props.height}px` : '',
    }));

    const blurDivClassObject: ComputedRef<object> = computed(() => ({
        [`${props.color ? resolveBg(props.color) : ''} bg-opacity-30`]: props.color,
        [parsedBlur.value]: props.blur,
        [parsedAspectRatio.value]: props.aspectRatio,
    }));

    const placeholderSize: ComputedRef<number> = computed(() => {
        if (props.width && !props.height) {
            return parseInt(props.width.toString()) / 3;
        } else if (props.height && !props.width) {
            return parseInt(props.height.toString()) / 3;
        } else if (props.height && props.width) {
            return Math.max(parseInt(props.width.toString()), parseInt(props.height.toString())) / 3;
        } else if (image) {
            return Math.max(image.getBoundingClientRect().width, image.getBoundingClientRect().height) / 3;
        }

        return 30;
    });
</script>

<template>
    <div class="relative" :class="imageClassObject" :style="imageStyleObject">
        <img
            class="transition-all duration-150"
            :id="imageId"
            :src="src"
            :alt="src"
            :class="[imageClassObject, loading ? 'opacity-0' : 'opacity-100']"
            :style="imageStyleObject"
        >

        <div class="absolute top-0 left-0"
             :class="blurDivClassObject"
             :style="{width: imageWidth, height: imageHeight} as StyleValue"
             v-if="blur || color"
        />

        <div class="absolute top-0 left-0 w-full h-full" v-if="loading">
            <slot name="placeholder">
                <div class="flex justify-center items-center w-full h-full">
                    <VLoader color="primary" :size="placeholderSize"/>
                </div>
            </slot>
        </div>
    </div>
</template>

<style scoped>

</style>