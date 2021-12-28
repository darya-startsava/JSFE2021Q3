import template from 'lodash.template';
import SettingsBackgroundHTML from './settings-background.html';
import './settings-background.scss';
import Component from '../abstract-component';

export default class SettingsBackground extends Component {
    constructor() {
        super('settings-background');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SettingsBackgroundHTML)();
        this.addListener();
        return this.container;
    }

    addListener() {
        const backgroundItemButtons = this.container.querySelectorAll<HTMLInputElement>('.button-background-item');
        backgroundItemButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                backgroundItemButtons.forEach((item) => item.classList.remove('button-background-item-active'));
                const target = event.target as HTMLElement;
                target.classList.add('button-background-item-active');
                const treeSection = document.querySelector<HTMLElement>('.tree-section');
                treeSection.style.backgroundImage = `url('./assets/backgrounds/${item.value}.jpg')`;
            })
        );
    }
}
