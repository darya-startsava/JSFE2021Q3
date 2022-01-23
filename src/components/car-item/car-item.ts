import './car-item.scss';
import Component from '../abstract-component';
import { deleteCar } from '../../api';
import renderGaragePage from '../../pages/garage';
import store2 from '../../store2';
import store from '../../store';

export default class CarItem extends Component {
    constructor(public name: string, public color: string, public id: number) {
        super('div', 'car-item');
    }
    render(): HTMLElement {
        const divCarRace = document.createElement('div');
        divCarRace.classList.add('car-race');
        divCarRace.innerHTML = ` <div class="start-stop-buttons">
        <button>Start</button>
        <button>Stop</button>
        </div>`;

        const svgObject = document.createElement('object');
        svgObject.classList.add('svgObject');
        svgObject.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100" height="100" viewBox="0 0 256 256" xml:space="preserve">
        <desc>Created with Fabric.js 1.7.22</desc>
        <defs>
        </defs>
        <g transform="translate(128 128) scale(0.72 0.72)" style="">
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)" >
            <path d="M 84.99 37.498 l -16.835 -2.571 c -0.428 -0.065 -0.824 -0.277 -1.115 -0.597 l -8.952 -9.805 c -1.115 -1.222 -2.703 -1.922 -4.357 -1.922 H 25.005 c -1.991 0 -3.833 0.993 -4.928 2.656 l -5.862 8.905 c -0.234 0.356 -0.586 0.625 -0.992 0.759 l -9.169 3.022 C 1.629 38.744 0 40.996 0 43.548 v 9.404 c 0 3.254 2.647 5.9 5.9 5.9 h 3.451 c 0.969 4.866 5.269 8.545 10.416 8.545 s 9.447 -3.679 10.416 -8.545 h 30.139 c 0.969 4.866 5.27 8.545 10.416 8.545 s 9.446 -3.679 10.415 -8.545 H 84.1 c 3.254 0 5.9 -2.646 5.9 -5.9 v -9.622 C 90 40.394 87.893 37.941 84.99 37.498 z M 19.767 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 s 6.623 2.971 6.623 6.623 C 26.39 60.427 23.419 63.397 19.767 63.397 z M 70.738 63.397 c -3.652 0 -6.623 -2.971 -6.623 -6.622 c 0 -3.652 2.971 -6.623 6.623 -6.623 c 3.651 0 6.622 2.971 6.622 6.623 C 77.36 60.427 74.39 63.397 70.738 63.397 z" style="stroke: #fff; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: ${this.color}; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
        </g>
        </g>
        </svg>`;

        const divFlag = document.createElement('div');
        divFlag.classList.add('flag');
        divCarRace.append(svgObject, divFlag);

        const divCarButtons = document.createElement('div');
        divCarButtons.classList.add('car-buttons');
        const buttonSelect = document.createElement('button');
        buttonSelect.classList.add('button-select');
        buttonSelect.innerHTML = 'Select';
        buttonSelect.dataset.id = `${this.id}`;
        const buttonRemove = document.createElement('button');
        buttonRemove.classList.add('button-remove');
        buttonRemove.innerHTML = 'Remove';
        buttonRemove.dataset.id = `${this.id}`;
        const divCarName = document.createElement('div');
        divCarName.classList.add('car-name');
        divCarName.innerHTML = `${this.name}`;
        divCarButtons.append(buttonSelect, buttonRemove, divCarName);
        this.container.append(divCarButtons, divCarRace);
        this.addListeners();
        return this.container;
    }

    addListeners(): void {
        const removeButtons = this.container.querySelectorAll<HTMLButtonElement>('.button-remove');
        removeButtons?.forEach((item) =>
            item.addEventListener('click', async () => {
                const id = Number(item.dataset.id);
                await deleteCar(id);
                renderGaragePage();
            })
        );
        const selectButtons = this.container.querySelectorAll<HTMLButtonElement>('.button-select');
        selectButtons?.forEach((item) =>
            item.addEventListener('click', () => {
                const id = Number(item.dataset.id);
                const selectedCar = store2.carsArray.find((item) => item.id === id);
                store.selectedCarId = selectedCar?.id;
                const updateCarName = document.querySelector<HTMLInputElement>('#update-car-name');
                const updateCarColor = document.querySelector<HTMLInputElement>('#update-car-color');
                if (updateCarName && updateCarColor && selectedCar) {
                    updateCarName.value = selectedCar.name;
                    updateCarColor.value = selectedCar.color;
                }
            })
        );
    }
}
