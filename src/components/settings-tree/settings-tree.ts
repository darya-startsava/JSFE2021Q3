import template from 'lodash.template';
import SettingsTreeHTML from './settings-tree.html';
import './settings-tree.scss';
import Component from '../abstract-component';

export default class SettingsTree extends Component {
    public treeNum: number = parseInt(localStorage.getItem('StDaTa-treeNum')) || 1;
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
        const mainTree = document.querySelector<HTMLElement>('.main-tree');
        treeItemButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                treeItemButtons.forEach((item) => item.classList.remove('button-tree-item-active'));
                const target = event.target as HTMLElement;
                target.classList.add('button-tree-item-active');
                this.treeNum = parseInt(item.value);
                mainTree.style.backgroundImage = `url('./assets/trees/${this.treeNum}.png')`;
                localStorage.setItem('StDaTa-treeNum', JSON.stringify(this.treeNum));
            })
        );
        mainTree.style.backgroundImage = `url('./assets/trees/${this.treeNum}.png')`;
        treeItemButtons.forEach(item => item.classList.remove('button-tree-item-active'))
        treeItemButtons[this.treeNum-1].classList.add('button-tree-item-active');
    }
}
