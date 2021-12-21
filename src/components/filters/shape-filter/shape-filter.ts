import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class ShapeFilter extends Component implements Filter {
    private shapes: string[] = [];
    constructor(private toyCards: ToyCard[], private onFilter: (toyCards: ToyCard[]) => void) {
        super('');
        this.addListener();
    }

    addListener() {
        const shapeButtons = document.querySelectorAll<HTMLInputElement>('.shape-button');
        shapeButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement;
                target.classList.toggle('active-shape-size');
                this.shapes = [];
                shapeButtons.forEach((item) => {
                    if (item.classList.contains('active-shape-size')) {
                        this.shapes.push(item.value);
                    }
                });
                const filtered = this.filter(this.toyCards);
                this.onFilter(filtered);
            })
        );
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        if (this.shapes.length === 0) return toyCards;
        return toyCards.filter((item) => this.shapes.indexOf(item.shape) !== -1);
    }
}
