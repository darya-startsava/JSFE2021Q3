import template from 'lodash.template';
import SettingsGarlandHTML from './settings-garland.html';
import './settings-garland.scss';
import Component from '../abstract-component';

export default class SettingsGarland extends Component {
    constructor() {
        super('settings-garland');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SettingsGarlandHTML)();
        const garland = document.querySelector<HTMLElement>('.garland-light-wrapper');
        const checkboxGarland = this.container.querySelector<HTMLInputElement>('.checkbox-garland');
        checkboxGarland.addEventListener('change', () => {
            if (checkboxGarland.checked == true) {
                garland.style.display = 'flex';
            } else {
                garland.style.display = 'none';
            }
        });
        return this.container;
    }
}
