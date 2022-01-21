import GarageButtons from '../components/garage-buttons/garage-buttons';
import CarItem from '../components/car-item/car-item';
import PrevNextButtons from '../components/prev-next-buttons/prev-next-buttons';

export default function renderGaragePage(): void {
    const garageButtons = new GarageButtons();
    const main = document.querySelector('main');
    const garageHeader = document.createElement('h2');
    const garagePage = document.createElement('h3');
    const carsItems = document.createElement('div');
    const carItem = new CarItem();
    const prevNextButtons = new PrevNextButtons();
    garageHeader.innerHTML = 'Garage(4)';
    garagePage.innerHTML = 'Page#1';
    if (main) {
        main.innerHTML = '';
        main.append(garageButtons.render());
        main.append(garageHeader, garagePage, carsItems);
        carsItems.append(carItem.render());
        main.append(prevNextButtons.render());
    }
}
