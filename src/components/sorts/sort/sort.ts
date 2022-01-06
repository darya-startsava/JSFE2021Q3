import template from 'lodash.template';
import SortHTML from './sort.html';
import './sort.scss';
import Component from '../../abstract-component';
import Sort from '../interface-sort';
import ToyCard from '../../toy-card/toy-card';

export default class Sorter extends Component implements Sort {
    public sortType = JSON.parse(localStorage.getItem('StDaTa-sortType') ?? '"default"');
    constructor(private onSort: () => void) {
        super('sort search-chosen-sort-fields');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SortHTML)();
        this.loadFilter();
        this.addListener();
        return this.container;
    }

    addListener():void {
        const sortField = this.container.querySelector<HTMLSelectElement>('.sort-field');
        sortField?.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLOptionElement;
            this.sortType = target.value;
            localStorage.setItem('StDaTa-sortType', JSON.stringify(this.sortType));
            this.onSort();
        });
    }

    loadFilter():void {
        const sortField = this.container.querySelector<HTMLSelectElement>('.sort-field');
        if (sortField) {
            sortField.value = this.sortType;
        }
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
                else return -1;
            });
        } else if (this.sortType === 'name-reverse') {
            return toyCards.sort(function (a, b) {
                if (a.name < b.name) return 1;
                else if (a.name == b.name) return 0;
                else return -1;
            });
        } else {
            return toyCards.sort(function (a, b) {
                return +a.num - +b.num;
            });
        }
    }
}
