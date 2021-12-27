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
        return this.container;
    }
}
