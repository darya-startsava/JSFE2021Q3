import GarageButtonsHTML from './garage-buttons.html';
import './garage-buttons.scss';
import Component from '../abstract-component';
import { createCar } from '../../api';
import renderGaragePage from '../../pages/garage';

export default class GarageButtons extends Component {
    constructor() {
        super('div', 'garage-buttons-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = GarageButtonsHTML;
        this.addListener();
        return this.container;
    }

    addListener(): void {
        const createCarButton = this.container.querySelector('.create-car-button');
        const createCarName = this.container.querySelector<HTMLInputElement>('#create-car-name');
        const createCarColor = this.container.querySelector<HTMLInputElement>('#create-car-color');
        createCarButton?.addEventListener('click', async () => {
            if (createCarName && createCarColor) {
                await createCar({ name: `${createCarName.value}`, color: `${createCarColor.value}` });
            }
            renderGaragePage();
        });
    }
}
