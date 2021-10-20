import {showTime} from './js/clock.js';
import {setLocalStorage, getLocalStorage} from './js/greeting.js';
import {setBg, getSlideNext, getSlidePrev} from './js/background.js';

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


showTime();
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
setBg();
slideNext.addEventListener('click', () => getSlideNext());
slidePrev.addEventListener('click', () => getSlidePrev());

