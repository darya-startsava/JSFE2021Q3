import wNumb from 'wnumb';
import noUiSlider, { API } from 'nouislider';
import './range.scss';
import Component from '../../abstract-component';
import Filter from '../interface-filter';
import ToyCard from '../../toy-card/toy-card';

export const minYear = 1940;
export const maxYear = 2020;

export default class YearFilter extends Component implements Filter {
    public minCurrentYear = JSON.parse(localStorage.getItem('StDaTa-minCurrentYear')) || minYear;
    public maxCurrentYear = JSON.parse(localStorage.getItem('StDaTa-maxCurrentYear')) || maxYear;
    public yearSlider: API;
    constructor(private onFilter: () => void) {
        super('');
    }

    addListener() {
        const slider = this.container.querySelector<HTMLInputElement>('.noUi-handle-lower');
        this.yearSlider.on('change.one', () => {
            this.minCurrentYear = slider.ariaValueNow;
            this.maxCurrentYear = slider.ariaValueMax;
            localStorage.setItem('StDaTa-minCurrentYear', JSON.stringify(this.minCurrentYear));
            localStorage.setItem('StDaTa-maxCurrentYear', JSON.stringify(this.maxCurrentYear));
            this.onFilter();
        });
    }

    loadFilter() {
        this.yearSlider.set([this.minCurrentYear, this.maxCurrentYear]);
    }

    resetFilter() {
        this.yearSlider.reset();
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => +item.year <= this.maxCurrentYear && +item.year >= this.minCurrentYear);
    }

    render(): HTMLElement {
        this.yearSlider = noUiSlider.create(this.container, {
            start: [minYear, maxYear],
            tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
            connect: true,
            step: 10,
            range: {
                min: minYear,
                max: maxYear,
            },
        });
        this.loadFilter();
        this.addListener();
        return this.container;
    }
}
