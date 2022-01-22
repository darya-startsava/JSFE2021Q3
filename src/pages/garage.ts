import GarageButtons from '../components/garage-buttons/garage-buttons';
import CarItem from '../components/car-item/car-item';
import PrevNextButtons from '../components/prev-next-buttons/prev-next-buttons';
import getCars from '../api';

async function loadCars(): Promise<CarItem[]> {
    const result = await getCars();
    const countCars = result.length;
    const carItems: CarItem[] = [];
    for (let i = 0; i < countCars; i++) {
        const { name, color, id } = result[i];
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
    garageHeader.innerHTML = `Garage(${carItems.length})`;
    garagePage.innerHTML = 'Page#1';

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
