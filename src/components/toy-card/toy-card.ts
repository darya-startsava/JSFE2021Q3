import template from 'lodash.template';
import ToyCardHTML from './toy-card.html';
import './toy-card.scss';
import Component from '../abstract-component';
import chosenSingleton, { MAX_CHOSEN_TOYS_COUNT, chosenArray } from '../chosen/chosen';
import Popup from '../popup/popup';

export default class ToyCard extends Component {
    constructor(
        public num: string,
        public name: string,
        public count: string,
        public year: string,
        public shape: string,
        public color: string,
        public size: string,
        public favorite: boolean
    ) {
        super('toy-card');
        this.onClick = this.onClick.bind(this);
        this.loadChosen = this.loadChosen.bind(this);
    }

    render(): HTMLElement {
        let favoriteText: string;
        if (this.favorite === true) {
            favoriteText = 'да';
        } else {
            favoriteText = 'нет';
        }
        this.container.innerHTML = template(ToyCardHTML)({
            name: this.name,
            num: this.num,
            count: this.count,
            year: this.year,
            shape: this.shape,
            color: this.color,
            size: this.size,
            favorite: favoriteText,
        });
        this.container.removeEventListener('click', this.onClick);
        this.container.addEventListener('click', this.onClick);
        return this.container;
    }

    onClick() {
        if (this.container.classList.contains('icon-chosen')) {
            chosenSingleton.remove(this.num);
            this.container.classList.remove('icon-chosen');
        } else {
            const res = chosenSingleton.add(this.num);
            if (res) {
                this.container.classList.add('icon-chosen');
            }
        }
    }

    loadChosen() {
        if (chosenArray.indexOf(this.num) !== -1) {
            this.container.classList.add('icon-chosen');
        }
    }
}
