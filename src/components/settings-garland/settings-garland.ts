import template from 'lodash.template';
import SettingsGarlandHTML from './settings-garland.html';
import './settings-garland.scss';
import Component from '../abstract-component';

export default class SettingsGarland extends Component {
    constructor() {
        super('settings-garland');
    }

    render(): HTMLElement {
        function removeClasses(item: HTMLElement): void {
            item.classList.remove('default');
            item.classList.remove('red');
            item.classList.remove('blue');
            item.classList.remove('yellow');
            item.classList.remove('green');
        }

        this.container.innerHTML = template(SettingsGarlandHTML)();
        const garland = document.querySelector<HTMLElement>('.garland-light-wrapper');
        const bulbs = document.querySelectorAll<HTMLElement>('.garland-bulb');
        const checkboxGarland = this.container.querySelector<HTMLInputElement>('.checkbox-garland');
        const garlandButtons = this.container.querySelectorAll<HTMLButtonElement>('.button-garland-item');
        checkboxGarland?.addEventListener('change', () => {
            if (garland) {
                if (checkboxGarland.checked == true) {
                    garland.style.display = 'flex';
                } else {
                    garland.style.display = 'none';
                }
            }
        });
        garlandButtons.forEach((item) => {
            item.addEventListener('click', () => {
                bulbs.forEach((bulb) => {
                    removeClasses(bulb);
                    bulb.classList.add(`${item.value}`);
                });
            });
        });
        return this.container;
    }
}
