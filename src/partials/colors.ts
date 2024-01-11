import type {Theme} from '../component-types/theme.ts';
const resolveBg = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        accent: 'bg-accent',
        success: 'bg-success',
        warning: 'bg-warning',
        danger: 'bg-danger',
    };

    return theme[color];
};

const resolveBgHover = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'hover:bg-primary',
        secondary: 'hover:bg-secondary',
        accent: 'hover:bg-accent',
        success: 'hover:bg-success',
        warning: 'hover:bg-warning',
        danger: 'hover:bg-danger',
    };

    return theme[color];
};

const resolveText = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        success: 'text-success',
        warning: 'text-warning',
        danger: 'text-danger',
    };

    return theme[color];
};

const resolveRing = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'ring-primary',
        secondary: 'ring-secondary',
        accent: 'ring-accent',
        success: 'ring-success',
        warning: 'ring-warning',
        danger: 'ring-danger',
    };

    return theme[color];
};

const resolveRingFocus = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'focus:ring-primary',
        secondary: 'focus:ring-secondary',
        accent: 'focus:ring-accent',
        success: 'focus:ring-success',
        warning: 'focus:ring-warning',
        danger: 'focus:ring-danger',
    };

    return theme[color];
};

const resolveStroke = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'stroke-primary',
        secondary: 'stroke-secondary',
        accent: 'stroke-accent',
        success: 'stroke-success',
        warning: 'stroke-warning',
        danger: 'stroke-danger',
    };

    return theme[color];
};

const resolveBorder = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'border-primary',
        secondary: 'border-secondary',
        accent: 'border-accent',
        success: 'border-success',
        warning: 'border-warning',
        danger: 'border-danger',
    };

    return theme[color];
};

const resolveBorderTop = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'border-t-primary',
        secondary: 'border-t-secondary',
        accent: 'border-t-accent',
        success: 'border-t-success',
        warning: 'border-t-warning',
        danger: 'border-t-danger',
    };

    return theme[color];
};

const resolveBorderFocus = (color: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger'): string => {
    const theme: Theme = {
        primary: 'focus:border-primary',
        secondary: 'focus:border-secondary',
        accent: 'focus:border-accent',
        success: 'focus:border-success',
        warning: 'focus:border-warning',
        danger: 'focus:border-danger',
    };

    return theme[color];
};

const isContrast = (color: string): boolean => {
    const innerColor: string = color.replace(/^rgba?\(|\s+|\)$/g, '');
    const colorList: number[] = innerColor.split(',').map((clr) => Number(clr));

    return (colorList[0] * 0.299) + (colorList[1] * 0.587) + (colorList[2] * 0.114) > 170;
};

const getContrastColor = (color: string): string => {
    return isContrast(color) ? '#565656' : '#fff';
};

const getContrastColorClass = (color: string): string => {
    return isContrast(color) ? 'gray-700' : 'white';
};

export {
    resolveBg,
    resolveBgHover,
    resolveRing,
    resolveRingFocus,
    resolveText,
    resolveStroke,
    resolveBorder,
    resolveBorderTop,
    resolveBorderFocus,
    getContrastColor,
    getContrastColorClass,
};
