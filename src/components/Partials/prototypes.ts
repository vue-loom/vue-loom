String.prototype.highlight = function (forTerm: string = ''): HTMLElement | string {
    const index: number = this.toLowerCase().indexOf(forTerm.toLowerCase());
    const length: number = forTerm.length + index;

    if (forTerm && index >= 0 && length >= 0) {
        return `<div class="flex">
                    ${this.substring(0, index)}<div class='bg-primary/10 text-primary rounded-md px-1 font-bold'>${this.substring(index, length)}</div>${this.substring(length)}
                </div>`;
    } else {
        return this;
    }
}

String.prototype.ucFirst = function (): string {
    return this[0].toUpperCase() + (this.length > 1 ? this.slice(1).toLowerCase() : '');
}

String.prototype.toCssUnit = function (): string {
    return this.replace(/[^.\d]/g, '') + (this.includes('%') ? '%' : 'px');
};