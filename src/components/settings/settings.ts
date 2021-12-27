import template from 'lodash.template';
import SettingsHTML from './settings.html';
import './settings.scss';
import Component from '../abstract-component';

export default class Settings extends Component {
    constructor() {
        super('settings-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SettingsHTML)();
        return this.container;
    }
}
