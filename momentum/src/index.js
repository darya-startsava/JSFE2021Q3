import {showTime} from './js/clock.js';
import {setLocalStorage, getLocalStorage} from './js/greeting.js';


showTime();
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
