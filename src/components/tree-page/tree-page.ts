import template from 'lodash.template';
import Garland from '../garland/garland';
import TreePageHTML from './tree-page.html';
import './tree-page.scss';

export default class TreePage {
    container: HTMLElement | null;

    constructor() {
        this.container = document.querySelector<HTMLElement>('main');
    }

    render(): HTMLElement | null {
        if (this.container) {
            this.container.innerHTML = template(TreePageHTML)();
        }
        const mainTree = this.container?.querySelector('.main-tree');
        const garland = new Garland();
        mainTree?.prepend(garland.render());
        return this.container;
    }
}
