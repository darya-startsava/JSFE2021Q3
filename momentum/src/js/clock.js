import { showGreeting } from './greeting.js'
import { getLocalizedString } from './localization-strings.js'

const time = document.querySelector('.time');
const day = document.querySelector('.date');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString('en-US', { hour12: false });
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
};

function showDate() {
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString(getLocalizedString('date.language'), options);
    day.textContent = currentDate;
    setTimeout(showDate, 1000);
};

export { showTime };
