import Component from '../../abstract-component';
import Sort from '../interface-sort';
import ToyCard from '../../toy-card/toy-card';

export default class AlfabeticalSort extends Component implements Sort {
    public sortType = '';
    constructor(private toyCards: ToyCard[], private onSort: (toyCards: ToyCard[]) => void) {
        super('');
        this.addListener();
    }

    addListener() {
        const sortField = document.querySelector<HTMLSelectElement>('.sort-field');
        sortField.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLOptionElement;
            this.sortType = target.value;
            const sorted = this.sort(this.toyCards);
            this.onSort(sorted);
        });
    }

    sort(toyCards: ToyCard[]): ToyCard[] {
        if (this.sortType === 'year') {
            return toyCards.sort(function (a, b) {
                return +a.year - +b.year;
            });
        } else if (this.sortType === 'year-reverse') {
            return toyCards.sort(function (a, b) {
                return +b.year - +a.year;
            });
        } else if (this.sortType === 'name') {
            return toyCards.sort(function (a, b) {
                if (a.name > b.name) return 1;
                else if (a.name == b.name) return 0;
                else if (a.name < b.name) return -1;
            });
        } else if (this.sortType === 'name-reverse') {
            return toyCards.sort(function (a, b) {
                if (a.name < b.name) return 1;
                else if (a.name == b.name) return 0;
                else if (a.name > b.name) return -1;
            });
        }
    }
}
