import template from 'lodash.template';
import StartPageHTML from './start-page.html';
import './start-page.scss';

export default class StartPage {
    container: HTMLElement | null;

    constructor() {
        this.container = document.querySelector<HTMLElement>('main');
    }

    render(): HTMLElement | null {
        if (this.container) {
            this.container.innerHTML = template(StartPageHTML)();
        }
        return this.container;
    }
}
