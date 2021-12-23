import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class ShapeFilter extends Component implements Filter {
    public shapes: string[] = JSON.parse(localStorage.getItem('StDaTa-shapes')) || [];
    constructor(private onFilter: () => void) {
        super('');
        this.addListener();
        this.loadFilter();
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
                localStorage.setItem('StDaTa-shapes', JSON.stringify(this.shapes));
                this.onFilter();
            })
        );
    }

    loadFilter() {
        const shapeButtons = document.querySelectorAll<HTMLInputElement>('.shape-button');
        shapeButtons.forEach((item) => {
            if (this.shapes.indexOf(item.value) !== -1) {
                item.classList.add('active-shape-size');
            }
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        if (this.shapes.length === 0) return toyCards;
        return toyCards.filter((item) => this.shapes.indexOf(item.shape) !== -1);
    }
}
