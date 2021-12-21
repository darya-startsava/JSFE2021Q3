import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class ColorFilter extends Component implements Filter {
    public colors: string[] = [];
    constructor(private toyCards: ToyCard[], private onFilter: (toyCards: ToyCard[]) => void) {
        super('');
        this.addListener();
    }

    addListener() {
        const colorButtons = document.querySelectorAll<HTMLInputElement>('.color-button');
        colorButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement;
                target.classList.toggle('active-color');
                this.colors = [];
                colorButtons.forEach((item) => {
                    if (item.classList.contains('active-color')) {
                        this.colors.push(item.value);
                    }
                });
                const filtered = this.filter(this.toyCards);
                this.onFilter(filtered);
            })
        );
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        if (this.colors.length === 0) return toyCards;
        return toyCards.filter((item) => this.colors.indexOf(item.color) !== -1);
    }
}