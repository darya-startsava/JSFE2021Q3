import Component from '../abstract-component';
import Popup from '../popup/popup';

export const chosenArray: string[] = JSON.parse(localStorage.getItem('StDaTa-chosenArray') ?? '[]');
export const MAX_CHOSEN_TOYS_COUNT = 20;

class Chosen extends Component {
    popup: Popup;
    constructor() {
        super('chosen search-chosen-sort-fields');
        this.popup = new Popup('Извините, все слоты заполнены');
    }

    render(): HTMLElement {
        this.container.innerHTML = `Избранные игрушки: ${chosenArray.length}/${MAX_CHOSEN_TOYS_COUNT}`;
        this.container.append(this.popup.render());
        return this.container;
    }

    add(num: string): boolean {
        if (chosenArray.length !== MAX_CHOSEN_TOYS_COUNT) {
            chosenArray.push(num);
            localStorage.setItem('StDaTa-chosenArray', JSON.stringify(chosenArray));
            this.render();
            return true;
        } else {
            this.popup.showPopup();
            return false;
        }
    }

    remove(num: string): void {
        chosenArray.splice(chosenArray.indexOf(num), 1);
        localStorage.setItem('StDaTa-chosenArray', JSON.stringify(chosenArray));
        this.render();
    }
}

export default new Chosen();
