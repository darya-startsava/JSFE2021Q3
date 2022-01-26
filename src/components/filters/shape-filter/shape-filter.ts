import template from 'lodash.template';
import ShapeFilterHTML from './shape-filter.html';
import './shape-filter.scss';
import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class ShapeFilter extends Component implements Filter {
    public shapes: string[] = JSON.parse(localStorage.getItem('StDaTa-shapes') || '[]');
    constructor(private onFilter: () => void) {
        super('shape-filter');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(ShapeFilterHTML)();
        this.loadFilter();
        this.addListener();
        return this.container;
    }
    addListener(): void {
        const shapeButtons = this.container.querySelectorAll<HTMLInputElement>('.shape-button');
        shapeButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement;
                target.classList.toggle('active-shape-size');
                this.shapes = [];
                shapeButtons.forEach((item) => {
                    if (item.classList.contains('active-shape-size')) {
                        this.shapes.push(item.ariaLabel);
                    }
                });
                localStorage.setItem('StDaTa-shapes', JSON.stringify(this.shapes));
                this.onFilter();
            })
        );
    }

    loadFilter(): void {
        const shapeButtons = this.container.querySelectorAll<HTMLInputElement>('.shape-button');
        shapeButtons.forEach((item) => {
            if (this.shapes.indexOf(item.ariaLabel) !== -1) {
                item.classList.add('active-shape-size');
            }
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        if (this.shapes.length === 0) return toyCards;
        return toyCards.filter((item) => this.shapes.indexOf(item.shape) !== -1);
    }
}
