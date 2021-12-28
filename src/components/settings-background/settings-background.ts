import template from 'lodash.template';
import SettingsBackgroundHTML from './settings-background.html';
import './settings-background.scss';
import Component from '../abstract-component';

export default class SettingsBackground extends Component {
    public backgroundNum: number = parseInt(localStorage.getItem('StDaTa-backgroundNum')) || 1;
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
        const treeSection = document.querySelector<HTMLElement>('.tree-section');
        backgroundItemButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                backgroundItemButtons.forEach((item) => item.classList.remove('button-background-item-active'));
                const target = event.target as HTMLElement;
                target.classList.add('button-background-item-active');
                this.backgroundNum = parseInt(item.value);
                treeSection.style.backgroundImage = `url('./assets/backgrounds/${this.backgroundNum}.jpg')`;
                localStorage.setItem('StDaTa-backgroundNum', JSON.stringify(this.backgroundNum));
            })
        );
        treeSection.style.backgroundImage = `url('./assets/backgrounds/${this.backgroundNum}.jpg')`;
backgroundItemButtons.forEach(item => item.classList.remove('button-background-item-active'))
        backgroundItemButtons[this.backgroundNum-1].classList.add('button-background-item-active');
    }
}
