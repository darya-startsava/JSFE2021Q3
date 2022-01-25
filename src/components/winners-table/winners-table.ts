import WinnersTableHTML from './winners-table.html';
import Component from '../abstract-component';
import './winners-table.scss';
import renderWinnerPage from '../../pages/winner';
import Sort from '../../enums/sort-enum';
import Order from '../../enums/order-enum';
import store from '../../store';

export default class Winners extends Component {
    constructor() {
        super('table', 'winners-table');
    }
    render(): HTMLElement {
        this.container.innerHTML = WinnersTableHTML;
        this.addWinsListener();
        return this.container;
    }

    addWinsListener(): void {
        const wins = this.container.querySelector<HTMLElement>('.wins');
        wins?.addEventListener('click', async () => {
            if (store.sort === Sort.wins && store.order === Order.ASC) {
                renderWinnerPage(Sort.wins, Order.DESC);
                store.sort = Sort.wins;
                store.order = Order.DESC;
            } else {
                renderWinnerPage(Sort.wins, Order.ASC);
                store.sort = Sort.wins;
                store.order = Order.ASC;
            }
        });

        const bestTime = this.container.querySelector<HTMLElement>('.best-time');
        bestTime?.addEventListener('click', async () => {
            if (store.sort === Sort.time && store.order === Order.ASC) {
                renderWinnerPage(Sort.time, Order.DESC);
                store.sort = Sort.time;
                store.order = Order.DESC;
            } else {
                renderWinnerPage(Sort.time, Order.ASC);
                store.sort = Sort.time;
                store.order = Order.ASC;
            }
        });
    }
}
