import Component from '../abstract-component';
import { goToWinnerPage, goToGaragePage } from '../../router';

export default class Header extends Component {
    constructor() {
        super('header', 'header');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<div class="header-buttons">
            <button class="button-garage">To garage</button>
            <button class="button-winners">To winners</button>
        <div>`;
        this.addListeners();
        return this.container;
    }

    addListeners(): void {
        const toWinners = this.container.querySelector('.button-winners');
        toWinners?.addEventListener('click', () => {
            goToWinnerPage();
        });

        const toGarage = this.container.querySelector('.button-garage');
        toGarage?.addEventListener('click', () => {
            goToGaragePage();
        });
    }
}
