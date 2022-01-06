import wNumb from 'wnumb';
import noUiSlider, { API } from 'nouislider';
import './range.scss';
import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export const minCount = 1;
export const maxCount = 12;

export default class CountFilter extends Component implements Filter {
    public minCurrentCount = JSON.parse(localStorage.getItem('StDaTa-minCurrentCount') ?? `${minCount}`);
    public maxCurrentCount = JSON.parse(localStorage.getItem('StDaTa-maxCurrentCount') ?? `${maxCount}`);
    public countSlider: API;
    constructor(private onFilter: () => void) {
        super('');
        this.countSlider = noUiSlider.create(this.container, {
            start: [minCount, maxCount],
            tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
            connect: true,
            step: 1,
            range: {
                min: minCount,
                max: maxCount,
            },
        });
    }

    addListener(): void {
        const slider = this.container.querySelector<HTMLInputElement>('.noUi-handle-lower');
        this.countSlider.on('change.one', () => {
            this.minCurrentCount = slider?.ariaValueNow;
            this.maxCurrentCount = slider?.ariaValueMax;
            localStorage.setItem('StDaTa-minCurrentCount', JSON.stringify(this.minCurrentCount));
            localStorage.setItem('StDaTa-maxCurrentCount', JSON.stringify(this.maxCurrentCount));
            this.onFilter();
        });
    }

    loadFilter(): void {
        this.countSlider.set([this.minCurrentCount, this.maxCurrentCount]);
    }

    resetFilter(): void {
        this.countSlider.reset();
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => +item.count <= this.maxCurrentCount && +item.count >= this.minCurrentCount);
    }

    render(): HTMLElement {
        this.loadFilter();
        this.addListener();
        return this.container;
    }
}
