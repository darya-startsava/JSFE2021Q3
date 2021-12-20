import wNumb from 'wnumb';
import noUiSlider from 'nouislider';
import './range.scss';

const sliderQuantity = document.getElementById('slider-quantity');
const sliderYear = document.getElementById('slider-year');
const minYear = 1940;
const maxYear = 2020;
const minCount = 1;
const maxCount = 12;

noUiSlider.create(sliderQuantity, {
    start: [minCount, maxCount],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    step: 1,
    range: {
        min: minCount,
        max: maxCount,
    },
});

noUiSlider.create(sliderYear, {
    start: [minYear, maxYear],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    step: 10,
    range: {
        min: minYear,
        max: maxYear,
    },
});
