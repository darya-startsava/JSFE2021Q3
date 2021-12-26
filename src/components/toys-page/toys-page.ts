import template from 'lodash.template';
import ToysPageHTML from './toys-page.html';
import './toys-page.scss';

export default class ToysPage {
    container: HTMLElement;

    constructor() {
        this.container = document.querySelector('main');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(ToysPageHTML)();
        return this.container;
    }
}
