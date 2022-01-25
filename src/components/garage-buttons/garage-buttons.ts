import GarageButtonsHTML from './garage-buttons.html';
import './garage-buttons.scss';
import Component from '../abstract-component';
import { createCar, race, updateCar } from '../../api';
import renderGaragePage from '../../pages/garage';
import { generateRandomCarName, generateRandomColor } from '../../generate-random-car';
import store from '../../store';
import store2 from '../../store2';

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
        const updateCarButton = this.container.querySelector('.update-car-button');
        const updateCarName = this.container.querySelector<HTMLInputElement>('#update-car-name');
        const updateCarColor = this.container.querySelector<HTMLInputElement>('#update-car-color');
        updateCarButton?.addEventListener('click', async () => {
            if (updateCarName && updateCarColor && store.selectedCarId) {
                await updateCar(store.selectedCarId, {
                    name: `${updateCarName.value}`,
                    color: `${updateCarColor.value}`,
                });
                renderGaragePage();
            }
        });
        const raceButton = this.container.querySelector('.button-race');
        raceButton?.addEventListener('click', async () => {
            store.resetArray = [];
            store.isReset = false;
            const promiseArray = [];
            for (let i = 0; i < store2.carsArray.length; i++) {
                promiseArray.push(race(store2.carsArray[i].id));
            }
            await Promise.all(promiseArray);
        });
        const resetButton = this.container.querySelector('.button-reset');
        resetButton?.addEventListener('click', () => {
            store.falseArray = [];
            store.isReset = true;
            const carObjects = document.querySelectorAll<HTMLElement>('.svgObject');
            for (let i = 0; i < carObjects.length; i++) {
                carObjects[i].style.left = '70px';
                store.resetArray.push(Number(carObjects[i].dataset.id));
            }
            const winnerPopup = document.querySelector('.winner-popup');
            if (winnerPopup) {
                winnerPopup.innerHTML = '';
            }
        });
    }
}
