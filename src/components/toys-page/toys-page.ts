import template from 'lodash.template';
import ToysPageHTML from './toys-page.html';
import './toys-page.scss';

export default class ToysPage {
    container: HTMLElement | null;

    constructor() {
        this.container = document.querySelector<HTMLElement>('main');
    }

    render(): HTMLElement | null {
        if (this.container) {
            this.container.innerHTML = template(ToysPageHTML)();
        }
        return this.container;
    }
}
