import './car-item.scss';
import Component from '../../abstract-component';

export default class CarItem extends Component {
    constructor() {
        super('div', 'car-item');
    }
    render(): HTMLElement {
        this.container.innerHTML = `<div class="car-buttons">
        <button class="button-select">Select</button>
        <button class="button-remove">Remove</button>
        <div class="car-name">Tesla</div>
    </div>
    <div class="car-race">
        <div class="start-stop-buttons">
            <button>Start</button>
            <button>Stop</button>
        </div>
        <div class="car"></div>
        <div class="flag"></div>
    </div>`;
        return this.container;
    }
}
