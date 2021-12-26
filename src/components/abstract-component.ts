export default abstract class Component {
    container: HTMLElement;

    constructor(className: string) {
        this.container = document.createElement('div');
        this.container.className = className;
    }

    render(): HTMLElement {
        return this.container;
    }
}
