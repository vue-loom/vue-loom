const highlight = (value: string, forTerm: string = ''): HTMLElement | string => {
    const index: number = value.toLowerCase().indexOf(forTerm.toLowerCase());
    const length: number = forTerm.length + index;

    if (forTerm && index >= 0 && length >= 0) {
        return `<div class="flex">
                    ${value.substring(0, index)}<div class='bg-primary/10 text-primary rounded-md px-1 font-bold'>${value.substring(index, length)}</div>${value.substring(length)}
                </div>`;
    } else {
        return value;
    }
}

const ucFirst = (value: string): string => {
    return value[0].toUpperCase() + (value.length > 1 ? value.slice(1).toLowerCase() : '');
}

const toCssUnit = (value: string): string => {
    return value.replace(/[^.\d]/g, '') + (value.includes('%') ? '%' : 'px');
};

export {
    highlight,
    ucFirst,
    toCssUnit
};