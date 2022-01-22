import GarageButtonsHTML from './garage-buttons.html';
import './garage-buttons.scss';
import Component from '../abstract-component';
import { createCar } from '../../api';
import renderGaragePage from '../../pages/garage';
import { generateRandomCarName, generateRandomColor } from '../../generate-random-car';

export default class GarageButtons extends Component {
    constructor() {
        super('div', 'garage-buttons-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = GarageButtonsHTML;
        this.addListeners();
        return this.container;
    }

    addListeners(): void {
        const createCarButton = this.container.querySelector('.create-car-button');
        const createCarName = this.container.querySelector<HTMLInputElement>('#create-car-name');
        const createCarColor = this.container.querySelector<HTMLInputElement>('#create-car-color');
        createCarButton?.addEventListener('click', async () => {
            if (createCarName && createCarColor) {
                await createCar({ name: `${createCarName.value}`, color: `${createCarColor.value}` });
            }
            renderGaragePage();
        });

        const generateCarsButton = this.container.querySelector('.generate-cars-button');
        const GENERATED_CARS_NUMBER = 100;
        generateCarsButton?.addEventListener('click', async () => {
            const promiseArray = [];
            for (let i = 1; i <= GENERATED_CARS_NUMBER; i++) {
                promiseArray.push(createCar({ name: `${generateRandomCarName()}`, color: `${generateRandomColor()}` }));
            }
            await Promise.all(promiseArray);
            renderGaragePage();
        });
    }
}
