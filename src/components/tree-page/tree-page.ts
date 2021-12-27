import template from 'lodash.template';
import TreePageHTML from './tree-page.html';
import './tree-page.scss';

export default class TreePage {
    container: HTMLElement;

    constructor() {
        this.container = document.querySelector('main');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(TreePageHTML)();
        return this.container;
    }
}