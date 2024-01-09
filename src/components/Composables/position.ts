import {nextTick, type Ref} from "vue";

let positionX: number = 0;
let positionY: number = 0;

const useClick = (event: MouseEvent): void => {
    positionX = event.clientX;
    positionY = event.clientY;
};

const usePosition = async (position: string, align: string, width: string, menuRef: Ref<HTMLElement | null>, triggerContainerRef: Ref<HTMLElement | null>): Promise<void> => {
    await nextTick((): void => {
        if (position === 'absolute') {
            absolutePositionStrategy(menuRef.value, align, position);
        } else if (position === 'top') {
            topPositionStrategy(menuRef.value, triggerContainerRef.value, width, align, position);
        } else if (position === 'bottom') {
            bottomPositionStrategy(menuRef.value, triggerContainerRef.value, width, align, position);
        } else if (position === 'right') {
            rightPositionStrategy(menuRef.value, triggerContainerRef.value, width);
        } else if (position === 'left') {
            leftPositionStrategy(menuRef.value, triggerContainerRef.value, width);
        }
    });
}

interface Style {
    top: number | string,
    bottom: number | string,
    left: number | string,
    right: number | string,
    width: number | string,
}

const alignMenu = (menuElBoundingRect: DOMRect, triggerContainerBoundingRect: DOMRect | null = null, styles: Style, align: string = 'right', position: string = 'bottom'): void => {
    console.log(align);
    if (align === 'right') {
        if (positionX + menuElBoundingRect.width >= innerWidth && position === 'absolute') {//Overflows offscreen right
            styles.right = 4;
        } else {
            if (triggerContainerBoundingRect) {
                styles.left = '';
                styles.right = innerWidth - triggerContainerBoundingRect.right;
            } else {
                styles.left = positionX;
            }
        }
    } else if (align === 'left') {
        if (positionX - menuElBoundingRect.width <= 0 && position === 'absolute') {//Overflows offscreen left
            console.log('oops')
            styles.left = 4;
        } else {
            if (triggerContainerBoundingRect) {
                console.log('hier')
                styles.left = triggerContainerBoundingRect.left;
            } else {
                console.log('ai')
                styles.right = Math.abs(innerWidth - positionX);
            }
        }
    } else if (align === 'center') {
        let triggerCenter: number = triggerContainerBoundingRect.left + (triggerContainerBoundingRect.width/2);
        styles.left = triggerContainerBoundingRect.left - ((triggerContainerBoundingRect.left + (menuElBoundingRect.width/2)) - triggerCenter);
        if (styles.left <= 0) {
            styles.left = 4;
        } else if (menuElBoundingRect.left + menuElBoundingRect.width >= innerWidth) {
            styles.left = '';
            styles.right = 4;
        }
    }
};

const setMenuStyles = (menuEl: HTMLElement, styles: Style): void => {
    Object.keys(styles).forEach((key: string) => menuEl.style[key] = styles[key].toCssUnit());
}

const absolutePositionStrategy = (menuEl: HTMLElement, align: string, position: string): void => {
    const styles: Style = {
        top: '',
        bottom: '',
        left: '',
        right: '',
        width: '',
    };

    const menuElBoundingRect: DOMRect = menuEl.getBoundingClientRect();

    styles.top = positionY;

    alignMenu(menuElBoundingRect, null, styles, align, position);

    setMenuStyles(menuEl, styles);
};

const topPositionStrategy = (menuEl: HTMLElement, triggerContainerEl: HTMLElement, width: string, align: string, position: string): void => {
    const styles: Style = {
        top: '',
        bottom: '',
        left: '',
        right: '',
        width: '',
    };

    const menuElBoundingRect: DOMRect = menuEl.getBoundingClientRect();
    const triggerContainerBoundingRect: DOMRect = triggerContainerEl.getBoundingClientRect();

    styles.bottom = window.innerHeight - triggerContainerBoundingRect.top;

    alignMenu(menuElBoundingRect, triggerContainerBoundingRect, styles, align, position);

    if (width === 'w-full') {
        styles.width = triggerContainerBoundingRect.width;
    }

    setMenuStyles(menuEl, styles);
};

const bottomPositionStrategy = (menuEl: HTMLElement, triggerContainerEl: HTMLElement, width: string, align: string, position: string): void => {
    const styles: Style = {
        top: '',
        bottom: '',
        left: '',
        right: '',
        width: '',
    };

    const menuElBoundingRect: DOMRect = menuEl.getBoundingClientRect();
    const triggerContainerBoundingRect: DOMRect = triggerContainerEl.getBoundingClientRect();

    styles.top = triggerContainerBoundingRect.bottom;

    alignMenu(menuElBoundingRect, triggerContainerBoundingRect, styles, align, position);

    if (width === 'w-full') {
        styles.width = triggerContainerBoundingRect.width;
    }

    setMenuStyles(menuEl, styles);
};

const rightPositionStrategy = (menuEl: HTMLElement, triggerContainerEl: HTMLElement, width: string): void => {
    const styles: Style = {
        top: '',
        bottom: '',
        left: '',
        right: '',
        width: '',
    };

    const triggerContainerBoundingRect: DOMRect = triggerContainerEl.getBoundingClientRect();

    styles.top = triggerContainerBoundingRect.top;
    styles.left = triggerContainerBoundingRect.right;

    if (width === 'w-full') {
        styles.width = triggerContainerBoundingRect.width;
    }

    setMenuStyles(menuEl, styles);
};

const leftPositionStrategy = (menuEl: HTMLElement, triggerContainerEl: HTMLElement, width: string): void => {
    const styles: Style = {
        top: '',
        bottom: '',
        left: '',
        right: '',
        width: '',
    };

    const triggerContainerBoundingRect: DOMRect = triggerContainerEl.getBoundingClientRect();

    styles.top = triggerContainerBoundingRect.top;
    styles.right = innerWidth - triggerContainerBoundingRect.left;

    if (width === 'w-full') {
        styles.width = triggerContainerBoundingRect.width;
    }

    setMenuStyles(menuEl, styles);
};

export {useClick, usePosition};
