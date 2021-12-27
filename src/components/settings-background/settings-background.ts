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
        return this.container;
    }
}
