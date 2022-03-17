import renderGaragePage from '../../pages/garage';
import UIStorage from '../../storages/UI-storage';
import dataStorage from '../../storages/data-storage';
import Component from '../abstract-component';

export default class PrevNextButtons extends Component {
    constructor() {
        super('div', 'prev-next-buttons');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<button class="button-prev-g">Prev page</button>
        <button class="button-next-g">Next page</button>`;
        this.addListeners();
        return this.container;
    }

    addListeners(): void {
        const buttonPrev = this.container.querySelector('.button-prev-g');
        const buttonNext = this.container.querySelector('.button-next-g');
        function prevPage(): void {
            if (UIStorage.carPage > 1) {
                UIStorage.carPage--;
                renderGaragePage();
            }
        }
        function nextPage(): void {
            if (UIStorage.carPage < Math.ceil(dataStorage.count / UIStorage.NUMBER_OF_CARS_ON_PAGE)) {
                UIStorage.carPage++;
                renderGaragePage();
            }
        }
        buttonNext?.addEventListener('click', nextPage);
        buttonPrev?.addEventListener('click', prevPage);
    }
}
