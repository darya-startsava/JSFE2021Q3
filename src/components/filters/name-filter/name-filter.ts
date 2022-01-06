import template from 'lodash.template';
import NameFilterHTML from './name-filter.html';
import './name-filter.scss';
import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class NameFilter extends Component implements Filter {
    public text = '';
    constructor(private onFilter: () => void) {
        super('search-form-wrapper');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(NameFilterHTML)();
        this.addListener();
        return this.container;
    }

    addListener() {
        const searchInput =this.container.querySelector<HTMLInputElement>('.search-input');
        searchInput?.addEventListener('input', () => {
            this.text = searchInput.value;
            this.onFilter();
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => item.name.toLowerCase().includes(this.text.toLowerCase()));
    }
}
