import template from 'lodash.template';
import ToyCardHTML from './toy-card.html';
import './toy-card.scss';
import Component from '../abstract-component';
import { chosen, chosenArray } from '../chosen/chosen';

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
            this.container.classList.remove('icon-chosen');
            chosenArray.splice(chosenArray.indexOf(this.num), 1);
        } else {
            if (chosenArray.length !== 20) {
                this.container.classList.add('icon-chosen');
                chosenArray.push(this.num);
            } else alert('Извините, все слоты заполнены');
        }
        localStorage.setItem('StDaTa-chosenArray', JSON.stringify(chosenArray));
        chosen.innerHTML = `Избранные игрушки: ${chosenArray.length}/20`;
    }

    loadChosen() {
        chosen.innerHTML = `Избранные игрушки: ${chosenArray.length}/20`;
        if (chosenArray.indexOf(this.num) !== -1) {
            this.container.classList.add('icon-chosen');
        }
    }
}
