declare global {
    interface String {
        highlight(forTerm: string): HTMLElement | string;

        ucFirst(): string;

        toCssUnit(): string;
    }
}

export {}
