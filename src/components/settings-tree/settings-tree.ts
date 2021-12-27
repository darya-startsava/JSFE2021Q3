import template from 'lodash.template';
import SettingsTreeHTML from './settings-tree.html';
import './settings-tree.scss';
import Component from '../abstract-component';

export default class SettingsTree extends Component {
    constructor() {
        super('settings-tree');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SettingsTreeHTML)();
        this.addListener();
        return this.container;
    }

    addListener() {
        const treeItemButtons = this.container.querySelectorAll<HTMLInputElement>('.button-tree-item');
        treeItemButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                treeItemButtons.forEach((item) => item.classList.remove('button-tree-item-active'));
                const target = event.target as HTMLElement;
                target.classList.add('button-tree-item-active');
                const mainTree = document.querySelector<HTMLElement>('.main-tree');
                mainTree.style.backgroundImage = `url('../../assets/trees/${item.value}.png')`;
            })
        );
    }
}
