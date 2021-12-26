import template from 'lodash.template';
import FavoriteFilterHTML from './favorite-filter.html';
import './favorite-filter.scss';
import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class FavoriteFilter extends Component implements Filter {
    public isFavorite = JSON.parse(localStorage.getItem('StDaTa-isFavorite')) || false;
    constructor(private onFilter: () => void) {
        super('favorite');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(FavoriteFilterHTML)();
        this.loadFilter();
        this.addListener();
        return this.container;
    }

    addListener() {
        const favoriteCheckbox = this.container.querySelector<HTMLInputElement>('.favorite-checkbox');
        favoriteCheckbox.addEventListener('change', () => {
            this.isFavorite = favoriteCheckbox.checked;
            localStorage.setItem('StDaTa-isFavorite', JSON.stringify(this.isFavorite));
            this.onFilter();
        });
    }

    loadFilter() {
        const favoriteCheckbox = this.container.querySelector<HTMLInputElement>('.favorite-checkbox');
        if (this.isFavorite === true) {
            favoriteCheckbox.checked = true;
        }
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => item.favorite === true || item.favorite === this.isFavorite);
    }
}
