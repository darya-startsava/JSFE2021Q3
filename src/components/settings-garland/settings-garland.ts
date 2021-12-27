import template from 'lodash.template';
import SettingsGarlandHTML from './settings-garland.html';
import './settings-garland.scss';
import Component from '../abstract-component';

export default class SettingsGarland extends Component {
    constructor() {
        super('settings-background');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SettingsGarlandHTML)();
        return this.container;
    }
}
