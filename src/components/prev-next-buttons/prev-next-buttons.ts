import renderGaragePage from '../../pages/garage';
import store from '../../store';
import store2 from '../../store2';
import Component from '../abstract-component';

export default class PrevNextButtons extends Component {
    constructor() {
        super('div', 'prev-next-buttons');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<button class="button-prev">Prev page</button>
        <button class="button-next">Next page</button>`;
        this.addListeners();
        return this.container;
    }

    addListeners(): void {
        const buttonPrev = this.container.querySelector('.button-prev');
        const buttonNext = this.container.querySelector('.button-next');
        function prevPage(): void {
            if (store.carPage > 1) {
                store.carPage -= 1;
                renderGaragePage();
            }
        }
        function nextPage(): void {
            if (store.carPage < Math.ceil(store2.count / 7)) {
                store.carPage += 1;
                renderGaragePage();
            }
        }
        buttonNext?.addEventListener('click', nextPage);
        buttonPrev?.addEventListener('click', prevPage);
    }
}
