import GarageButtonsHTML from './garage-buttons.html';
import './garage-buttons.scss';
import Component from '../abstract-component';

export default class GarageButtons extends Component {
    constructor() {
        super('div', 'garage-buttons-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = GarageButtonsHTML;
        return this.container;
    }
}
