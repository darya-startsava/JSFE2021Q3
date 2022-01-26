import GarageButtonsHTML from './garage-buttons.html';
import './garage-buttons.scss';
import Component from '../abstract-component';
import { createCar, race, startEngine, updateCar } from '../../api';
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
        const raceButton = this.container.querySelector<HTMLButtonElement>('.button-race');
        const resetButton = this.container.querySelector<HTMLButtonElement>('.button-reset');
        raceButton?.addEventListener('click', async () => {
            store.resetArray = [];
            store.isReset = false;
            raceButton.disabled = true;
            raceButton.classList.add('disabled');
            if (resetButton) {
                resetButton.disabled = false;
                resetButton.classList.remove('disabled');
            }
            const promiseArray = [];
            store.currentRace += 1;
            for (let i = 0; i < store2.carsArray.length; i++) {
                promiseArray.push(startEngine(store2.carsArray[i].id));
            }
            await Promise.all(promiseArray).then((value) => {
                value.forEach((item) => race(store.currentRace, item.time, item.id));
            });
        });
        resetButton?.addEventListener('click', () => {
            store.falseArray = [];
            store.isReset = true;
            resetButton.disabled = true;
            resetButton.classList.add('disabled');
            if (raceButton) {
                raceButton.disabled = false;
                raceButton.classList.remove('disabled');
            }
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
