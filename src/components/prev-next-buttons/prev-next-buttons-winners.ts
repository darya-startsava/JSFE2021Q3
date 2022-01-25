import renderWinnerPage from '../../pages/winner';
import store from '../../store';
import store2 from '../../store2';
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
            if (store.winnersPage > 1) {
                store.winnersPage -= 1;
                renderWinnerPage();
            }
        }
        function nextPage(): void {
            if (store.winnersPage < Math.ceil(store2.winnersCount / store.NUMBER_OF_WINNERS_ON_PAGE)) {
                store.winnersPage += 1;
                renderWinnerPage();
            }
        }
        buttonNext?.addEventListener('click', nextPage);
        buttonPrev?.addEventListener('click', prevPage);
    }
}
