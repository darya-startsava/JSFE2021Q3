import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class SizeFilter extends Component implements Filter {
    public sizes: string[] = [];
    constructor(private toyCards: ToyCard[], private onFilter: (toyCards: ToyCard[]) => void) {
        super('');
        this.addListener();
    }

    addListener() {
        const sizeButtons = document.querySelectorAll<HTMLInputElement>('.size-button');
        sizeButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement;
                target.classList.toggle('active-shape-size');
                this.sizes = [];
                sizeButtons.forEach((item) => {
                    if (item.classList.contains('active-shape-size')) {
                        this.sizes.push(item.value);
                    }
                });
                const filtered = this.filter(this.toyCards);
                this.onFilter(filtered);
            })
        );
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        if (this.sizes.length === 0) return toyCards;
        return toyCards.filter((item) => this.sizes.indexOf(item.size) !== -1);
    }
}