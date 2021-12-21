import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class FavoriteFilter extends Component implements Filter {
    public isFavorite = false;
    constructor(private toyCards: ToyCard[], private onFilter: (toyCards: ToyCard[]) => void) {
        super('');
        this.addListener();
    }

    addListener() {
        const favoriteCheckbox = document.querySelector<HTMLInputElement>('.favorite-checkbox');
        favoriteCheckbox.addEventListener('change', () => {
            this.isFavorite = favoriteCheckbox.checked;
            const filtered = this.filter(this.toyCards);
            this.onFilter(filtered);
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => item.favorite === true || item.favorite === this.isFavorite);
    }
}
