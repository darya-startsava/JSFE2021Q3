import renderWinnerPage from '../../pages/winner';
import UIStorage from '../../storages/UI-storage';
import dataStorage from '../../storages/data-storage';
import Component from '../abstract-component';

export default class PrevNextButtons extends Component {
    constructor() {
        super('div', 'prev-next-buttons');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<button class="button-prev-w">Prev page</button>
        <button class="button-next-w">Next page</button>`;
        this.addListeners();
        return this.container;
    }

    addListeners(): void {
        const buttonPrev = this.container.querySelector('.button-prev-w');
        const buttonNext = this.container.querySelector('.button-next-w');
        function prevPage(): void {
            if (UIStorage.winnersPage > 1) {
                UIStorage.winnersPage--;
                renderWinnerPage(UIStorage.sort, UIStorage.order);
            }
        }
        function nextPage(): void {
            if (UIStorage.winnersPage < Math.ceil(dataStorage.winnersCount / UIStorage.NUMBER_OF_WINNERS_ON_PAGE)) {
                UIStorage.winnersPage++;
                renderWinnerPage(UIStorage.sort, UIStorage.order);
            }
        }
        buttonNext?.addEventListener('click', nextPage);
        buttonPrev?.addEventListener('click', prevPage);
    }
}
