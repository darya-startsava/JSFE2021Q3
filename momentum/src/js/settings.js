
import { getLocalizedString, changeLanguageIcon } from './localization-strings.js';
import { currentBackground } from './background.js';
import { time } from './clock.js';

const radiobuttonText = document.querySelector('.radiobutton-text');
const englishLanguage = document.getElementById('english-language');
const russianLanguage = document.getElementById('russian-language');
const setBackgroundText = document.querySelector('.set-background-text');
const setBackgroundTextExplanation = document.querySelector('.set-background-text-explanation');
const labelsBackground = document.querySelectorAll('.background');
export const inputShowTime = document.querySelector('.input-show-time');
const setTagText = document.querySelector('.set-tag-text');
const setTagTextExplanation = document.querySelector('.set-tag-text-explanation');
const showTimeText = document.querySelector('.show-time-text');
const showTime = document.querySelector('.show-time');
const showDate = document.querySelector('.show-date');
const showGreeting = document.querySelector('.show-greeting');
const showQuote = document.querySelector('.show-quote');
const showWeather = document.querySelector('.show-weather');
const showPlayer = document.querySelector('.show-player');


export function translateSettings() {
    radiobuttonText.textContent = getLocalizedString('settings.language');
    englishLanguage.textContent = getLocalizedString('settings.en');
    russianLanguage.textContent = getLocalizedString('settings.ru');
    changeLanguageIcon();
    setBackgroundText.textContent = getLocalizedString('settings.background');
    setBackgroundTextExplanation.textContent = getLocalizedString('settings.background.exp');
    changeBackgroundIcon();
    setTagText.textContent = getLocalizedString('settings.tag');
    setTagTextExplanation.textContent = getLocalizedString('settings.tag.exp');
    showTimeText.textContent = getLocalizedString('settings.show.hide');
    showTime.textContent = getLocalizedString('show.time');
    showDate.textContent = getLocalizedString('show.date');
    showGreeting.textContent = getLocalizedString('show.greeting');
    showQuote.textContent = getLocalizedString('show.quote');
    showWeather.textContent = getLocalizedString('show.weather');
    showPlayer.textContent = getLocalizedString('show.player');
}

function changeBackgroundIcon() {
    labelsBackground.forEach((item) => { item.classList.remove('background-active') });
    if (currentBackground == 'gitHub') {
        labelsBackground[0].classList.add('background-active');
    } else if (currentBackground == 'unsplash') {
        labelsBackground[1].classList.add('background-active');
    } else {
        labelsBackground[2].classList.add('background-active');
    }
};

export function toggleTimeWidget() {
    if (inputShowTime.checked) {
        time.style.opacity = '1';
    } else {
        time.style.opacity = '0';
    }
}

