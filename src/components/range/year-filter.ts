import wNumb from 'wnumb';
import noUiSlider from 'nouislider';
import './range.scss';
import Component from '../abstract-component';
import Filter from '../filters/interface-filter';
import ToyCard from '../toy-card/toy-card';

const sliderYear = document.getElementById('slider-year');
const minYear = 1940;
const maxYear = 2020;

export const yearSlider = noUiSlider.create(sliderYear, {
    start: [minYear, maxYear],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    step: 10,
    range: {
        min: minYear,
        max: maxYear,
    },
});

export default class YearFilter extends Component implements Filter {
    public minCurrentYear = JSON.parse(localStorage.getItem('StDaTa-minCurrentYear')) || 1940;
    public maxCurrentYear = JSON.parse(localStorage.getItem('StDaTa-maxCurrentYear')) || 2020;
    constructor(private onFilter: () => void) {
        super('');
        this.addListener();
        this.loadFilter();
    }

    addListener() {
        const slider = document.querySelectorAll<HTMLInputElement>('.noUi-handle-lower');
        yearSlider.on('change.one', () => {
            this.minCurrentYear = slider[1].ariaValueNow;
            this.maxCurrentYear = slider[1].ariaValueMax;
            localStorage.setItem('StDaTa-minCurrentYear', JSON.stringify(this.minCurrentYear));
            localStorage.setItem('StDaTa-maxCurrentYear', JSON.stringify(this.maxCurrentYear));
            this.onFilter();
        });
    }

    loadFilter() {
        yearSlider.set([this.minCurrentYear, this.maxCurrentYear]);
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => +item.year <= this.maxCurrentYear && +item.year >= this.minCurrentYear);
    }
}
