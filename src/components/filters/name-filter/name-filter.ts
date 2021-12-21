import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class NameFilter extends Component implements Filter {
    private text = '';
    constructor(private toyCards: ToyCard[], private onFilter: (toyCards: ToyCard[]) => void) {
        super('');
        this.addListener();
    }

    addListener() {
        const searchInput = document.querySelector<HTMLInputElement>('.search-input');
        searchInput.addEventListener('input', () => {
            this.text = searchInput.value;
            const filtered = this.filter(this.toyCards);
            this.onFilter(filtered);
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => item.name.toLowerCase().includes(this.text.toLowerCase()));
    }
}
