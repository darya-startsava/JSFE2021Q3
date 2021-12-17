
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './global.scss';
import wNumb from 'wnumb';

const sliderQuantity = document.getElementById('slider-quantity');
const sliderYear = document.getElementById('slider-year');

noUiSlider.create(sliderQuantity, {
    start: [1, 12],
    tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
    connect: true,
    step: 1,
    range: {
        min: 1,
        max: 12,
    },
});

noUiSlider.create(sliderYear, {
    start: [1940, 2020],
    tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})],
    connect: true,
    step: 10,
    range: {
        min: 1940,
        max: 2020,
    },
});
