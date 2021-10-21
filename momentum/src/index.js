import { showTime } from './js/clock.js';
import { setLocalStorage, getLocalStorage } from './js/greeting.js';
import { slideNext, slidePrev, setBg, getSlideNext, getSlidePrev } from './js/background.js';
import { city, getWeather, getWeatherOnLoad, getLocalStorageCity, setLocalStorageCity } from './js/weather.js';
import './js/quote.js'


showTime();
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
setBg();
slideNext.addEventListener('click', () => getSlideNext());
slidePrev.addEventListener('click', () => getSlidePrev());
getWeatherOnLoad ();
city.addEventListener('change', () => getWeather());
window.addEventListener('beforeunload', setLocalStorageCity);
window.addEventListener('load', getLocalStorageCity);


