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
    public minCurrentCount = 1;
    public maxCurrentCount = 12;
    constructor(private toyCards: ToyCard[], private onFilter: (toyCards: ToyCard[]) => void) {
        super('');
        this.addListener();
    }

    addListener() {
        const slider = document.querySelectorAll<HTMLInputElement>('.noUi-handle-lower');
        countSlider.on('change.one', () => {
            this.minCurrentCount = +slider[0].ariaValueNow;
            this.maxCurrentCount = +slider[0].ariaValueMax;
            const filtered = this.filter(this.toyCards);
            this.onFilter(filtered);
        });
    }

    filter(toyCards: ToyCard[]): ToyCard[] {
        return toyCards.filter((item) => +item.count <= this.maxCurrentCount && +item.count >= this.minCurrentCount);
    }
}
