import './garage-buttons.scss';
import Component from '../../abstract-component';

export default class GarageButtons extends Component {
    constructor() {
        super('div', 'garage-buttons-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = `<div class="create-car-wrapper">
        <label for="create-car">Create car:</label>
        <input type="text" name="create-car" class="input-text">
        <label for="create-car-color"></label>
        <input type="color" name="create-car-color" value="#33b333" class="input-color">
        <button class="create-car-button">Create</button>
    </div>
    <div class="update-car-wrapper">
        <label for="update-car">Update car:</label>
        <input type="text" name="update-car" class="input-text">
        <label for="update-car-color"></label>
        <input type="color" name="update-car-color" value="#33b333" class="input-color">
        <button class="update-car-button">Update</button>
    </div>
    <div class="control-buttons-wrapper">
        <button>Race</button>
        <button>Reset</button>
        <button>Generate cars</button>
    </div>`;
        return this.container;
    }
}
