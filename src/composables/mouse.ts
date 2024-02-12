import {onBeforeUnmount, onMounted, type Ref} from 'vue'
import {getContrastColor} from "@/partials/colors";

export function useClickOutside(component: Ref<HTMLElement | null>, callback: () => void) {
    if (!component) return;

    const listener = (event: MouseEvent): void => {
        if (event.target !== component.value && event.composedPath().includes(component.value)) {
            return;
        }

        callback();
    }

    onMounted(() => window.addEventListener('click', listener));
    onBeforeUnmount(() => window.removeEventListener('click', listener));

    return {listener};
}

export function useRipple(mouseEvent: MouseEvent, componentRef: Ref<HTMLElement | null>, color: string | null = null): void {
    if (componentRef) {
        const contrastColor: string = color || getContrastColor(getComputedStyle(componentRef.value).getPropertyValue('background-color'));
        const rippleDiv: HTMLElement = document.createElement('div');

        const componentRect: DOMRect = componentRef.value.getBoundingClientRect();
        const diameter: number = Math.max(componentRect.width, componentRect.height);
        const radius: number = diameter / 2;

        rippleDiv.style.position = 'absolute';
        rippleDiv.style.width = `${diameter}px`;
        rippleDiv.style.height = `${diameter}px`;
        rippleDiv.style.left = `${mouseEvent.pageX - (componentRef.value.offsetLeft + radius)}px`;
        rippleDiv.style.top = `${mouseEvent.pageY - (componentRef.value.offsetTop + radius)}px`;
        rippleDiv.style.backgroundColor = contrastColor;
        rippleDiv.style.borderRadius = '50%';
        rippleDiv.style.transition = 'all 0.5s ease-in-out';
        rippleDiv.style.transform = 'scale(0)';
        rippleDiv.style.opacity = '0.2';

        componentRef.value.appendChild(rippleDiv);

        setTimeout((): void => {
            rippleDiv.style.opacity = '0';
            rippleDiv.style.transform = 'scale(1.2)';
        }, 0);

        setTimeout((): void => rippleDiv.remove(), 1000);
    }
}
