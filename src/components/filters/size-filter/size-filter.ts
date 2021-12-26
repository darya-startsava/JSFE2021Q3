import template from 'lodash.template';
import SizeFilterHTML from './size-filter.html';
import './size-filter.scss';
import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class SizeFilter extends Component implements Filter {
    public sizes: string[] = JSON.parse(localStorage.getItem('StDaTa-sizes')) || [];
    constructor(private onFilter: () => void) {
        super('size-filter');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(SizeFilterHTML)();
        this.loadFilter();
        this.addListener();
        return this.container;
    }

    addListener() {
        const sizeButtons = this.container.querySelectorAll<HTMLInputElement>('.size-button');
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
                localStorage.setItem('StDaTa-sizes', JSON.stringify(this.sizes));
                this.onFilter();
            })
        );
    }

    loadFilter() {
        const sizeButtons = this.container.querySelectorAll<HTMLInputElement>('.size-button');
        sizeButtons.forEach((item) => {
            if (this.sizes.indexOf(item.value) !== -1) {
                item.classList.add('active-shape-size');
            }
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        if (this.sizes.length === 0) return toyCards;
        return toyCards.filter((item) => this.sizes.indexOf(item.size) !== -1);
    }
}
