import template from 'lodash.template';
import ColorFilterHTML from './color-filter.html';
import './color-filter.scss';
import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export default class ColorFilter extends Component implements Filter {
    public colors: string[] = JSON.parse(localStorage.getItem('StDaTa-colors') || '[]');
    constructor(private onFilter: () => void) {
        super('color-filter');
    }

    render(): HTMLElement {
        this.container.innerHTML = template(ColorFilterHTML)();
        this.loadFilter();
        this.addListener();
        return this.container;
    }

    addListener(): void {
        const colorButtons = this.container.querySelectorAll<HTMLInputElement>('.color-button');
        colorButtons.forEach((item) =>
            item.addEventListener('click', (event: Event) => {
                const target = event.target as HTMLElement;
                target.classList.toggle('active-color');
                this.colors = [];
                colorButtons.forEach((item) => {
                    if (item.classList.contains('active-color')) {
                        this.colors.push(item.ariaLabel);
                    }
                });
                localStorage.setItem('StDaTa-colors', JSON.stringify(this.colors));
                this.onFilter();
            })
        );
    }

    loadFilter(): void {
        const colorButtons = this.container.querySelectorAll<HTMLInputElement>('.color-button');
        colorButtons.forEach((item) => {
            if (this.colors.indexOf(item.ariaLabel) !== -1) {
                item.classList.add('active-color');
            }
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        if (this.colors.length === 0) return toyCards;
        return toyCards.filter((item) => this.colors.indexOf(item.color) !== -1);
    }
}
