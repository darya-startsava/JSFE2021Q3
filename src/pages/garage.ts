import GarageButtons from '../components/garage-buttons/garage-buttons';
import CarItem from '../components/car-item/car-item';
import PrevNextButtons from '../components/prev-next-buttons/prev-next-buttons';
import getCars from '../api';
import store from '../store';
import store2 from '../store2';

async function loadCars(): Promise<CarItem[]> {
    const { carsArray, count } = await getCars();
    store2.carsArray = carsArray;
    store2.count = count;
    const carItems: CarItem[] = [];
    for (let i = 0; i < carsArray.length; i++) {
        const { name, color, id } = carsArray[i];
        const carItem = new CarItem(name, color, id);
        carItems.push(carItem);
    }
    return carItems;
}

export default async function renderGaragePage(): Promise<void> {
    const garageButtons = new GarageButtons();
    const main = document.querySelector('main');
    const garageHeader = document.createElement('h2');
    const garagePage = document.createElement('h3');

    const carItems = await loadCars();

    const prevNextButtons = new PrevNextButtons();
    garageHeader.innerHTML = `Garage(${store2.count})`;
    garagePage.innerHTML = `Page#${store.carPage}`;

    const divCarsItems = document.createElement('div');
    function renderCars(carItems: CarItem[]): void {
        for (const item of carItems) {
            divCarsItems.append(item.render());
        }
    }
    renderCars(carItems);

    if (main) {
        main.innerHTML = '';
        main.append(garageButtons.render());
        main.append(garageHeader, garagePage, divCarsItems);
        main.append(prevNextButtons.render());
    }
}
