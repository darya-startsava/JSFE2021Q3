import wNumb from 'wnumb';
import noUiSlider from 'nouislider';
import './range.scss';
import Component from '../abstract-component';
import Filter from '../filters/interface-filter';
import ToyCard from '../toy-card/toy-card';

const sliderQuantity = document.getElementById('slider-quantity');
const minCount = 1;
const maxCount = 12;

export const countSlider = noUiSlider.create(sliderQuantity, {
    start: [minCount, maxCount],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    step: 1,
    range: {
        min: minCount,
        max: maxCount,
    },
});

export default class CountFilter extends Component implements Filter {
    public minCurrentCount = JSON.parse(localStorage.getItem('StDaTa-minCurrentCount')) || 1;
    public maxCurrentCount = JSON.parse(localStorage.getItem('StDaTa-maxCurrentCount')) || 12;
    constructor(private onFilter: () => void) {
        super('');
        this.addListener();
        this.loadFilter();
    }

    addListener() {
        const slider = document.querySelectorAll<HTMLInputElement>('.noUi-handle-lower');
        countSlider.on('change.one', () => {
            this.minCurrentCount = slider[0].ariaValueNow;
            this.maxCurrentCount = slider[0].ariaValueMax;
            localStorage.setItem('StDaTa-minCurrentCount', JSON.stringify(this.minCurrentCount));
            localStorage.setItem('StDaTa-maxCurrentCount', JSON.stringify(this.maxCurrentCount));
            this.onFilter();
        });
    }

    loadFilter() {
        countSlider.set([this.minCurrentCount,this.maxCurrentCount]);
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => +item.count <= this.maxCurrentCount && +item.count >= this.minCurrentCount);
    }
}
