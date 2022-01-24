import CarItemHTML from './car-item.html';
import './car-item.scss';
import Component from '../abstract-component';

export default class CarItem extends Component {
    constructor() {
        super('div', 'car-item');
    }
    render(): HTMLElement {
        this.container.innerHTML = CarItemHTML;
        return this.container;
    }
}
