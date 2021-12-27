import template from 'lodash.template';
import StartPageHTML from './start-page.html';
import './start-page.scss';

export default class StartPage {
    container: HTMLElement;

    constructor() {
        this.container = document.querySelector('main');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(StartPageHTML)();
        return this.container;
    }
}