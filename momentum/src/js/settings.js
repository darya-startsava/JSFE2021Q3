
import { getLocalizedString, changeLanguageIcon } from './localization-strings.js';
import { currentBackground } from './background.js';
import { time, date } from './clock.js';
import { greetingContainer } from './greeting.js';
import { quoteAndAuthor } from './quote.js';
import { weather } from './weather.js';
import { player } from './player.js';
import {tagButton} from './background-api.js';


const radiobuttonText = document.querySelector('.radiobutton-text');
const englishLanguage = document.getElementById('english-language');
const russianLanguage = document.getElementById('russian-language');
const setBackgroundText = document.querySelector('.set-background-text');
const setBackgroundTextExplanation = document.querySelector('.set-background-text-explanation');
const labelsBackground = document.querySelectorAll('.background');
export const inputShowTime = document.querySelector('.input-show-time');
export const inputShowDate = document.querySelector('.input-show-date');
export const inputShowGreeting = document.querySelector('.input-show-greeting');
export const inputShowQuote = document.querySelector('.input-show-quote');
export const inputShowWeather = document.querySelector('.input-show-weather');
export const inputShowPlayer = document.querySelector('.input-show-player');
const setTagText = document.querySelector('.set-tag-text');
const setTagTextExplanation = document.querySelector('.set-tag-text-explanation');
const showTimeText = document.querySelector('.show-time-text');
const showTime = document.querySelector('.show-time');
const showDate = document.querySelector('.show-date');
const showGreeting = document.querySelector('.show-greeting');
const showQuote = document.querySelector('.show-quote');
const showWeather = document.querySelector('.show-weather');
const showPlayer = document.querySelector('.show-player');
let isTimeChecked;
let isDateChecked;
let isGreetingChecked;
let isQuoteChecked;
let isWeatherChecked;
let isPlayerChecked;
export const buttonClose = document.querySelector('.button-close');
const settingsPopup = document.querySelector('.settings-popup');
export const buttonSettings = document.querySelector('.button-settings');


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
    tagButton.textContent = getLocalizedString('tag.button');
}

function changeBackgroundIcon() {
    labelsBackground.forEach((item) => { item.classList.remove('background-active') });
    if (currentBackground == 'gitHub') {
        labelsBackground[0].classList.add('background-active');
    } else if (currentBackground == 'unsplash') {
        labelsBackground[1].classList.add('background-active');
    } else if (currentBackground == 'flickr'){
        labelsBackground[2].classList.add('background-active');
    }
};

export function toggleTimeWidget() {
    if (inputShowTime.checked) {
        time.style.opacity = '1';
        time.style.transition = 'opacity .5s';
        isTimeChecked = 'yes';
    } else {
        time.style.opacity = '0';
        isTimeChecked = 'no';
    }
}

export function toggleDateWidget() {
    if (inputShowDate.checked) {
        date.style.opacity = '1';
        date.style.transition = 'opacity .5s';
        isDateChecked = 'yes';
    } else {
        date.style.opacity = '0';
        isDateChecked = 'no';
    }
}

export function toggleGreetingWidget() {
    if (inputShowGreeting.checked) {
        greetingContainer.style.opacity = '1';
        greetingContainer.style.transition = 'opacity .5s';
        isGreetingChecked = 'yes';
    } else {
        greetingContainer.style.opacity = '0';
        isGreetingChecked = 'no';
    }
}

export function toggleQuoteWidget() {
    if (inputShowQuote.checked) {
        quoteAndAuthor.style.opacity = '1';
        quoteAndAuthor.style.transition = 'opacity .5s';
        isQuoteChecked = 'yes';
    } else {
        quoteAndAuthor.style.opacity = '0';
        isQuoteChecked = 'no';
    }
}

export function toggleWeatherWidget() {
    if (inputShowWeather.checked) {
        weather.style.opacity = '1';
        weather.style.transition = 'opacity .5s';
        isWeatherChecked = 'yes';
    } else {
        weather.style.opacity = '0';
        isWeatherChecked = 'no';
    }
}

export function togglePlayerWidget() {
    if (inputShowPlayer.checked) {
        player.style.opacity = '1';
        player.style.transition = 'opacity .5s';
        isPlayerChecked = 'yes';
    } else {
        player.style.opacity = '0';
        isPlayerChecked = 'no';
    }
}

export function setLocalStorageSettings() {
    localStorage.setItem('isTimeChecked', isTimeChecked);
    localStorage.setItem('isDateChecked', isDateChecked);
    localStorage.setItem('isGreetingChecked', isGreetingChecked);
    localStorage.setItem('isQuoteChecked', isQuoteChecked);
    localStorage.setItem('isWeatherChecked', isWeatherChecked);
    localStorage.setItem('isPlayerChecked', isPlayerChecked);

}



export function getLocalStorageSettings() {
    if (!(localStorage.getItem('isTimeChecked')) || localStorage.getItem('isTimeChecked') == 'yes') {
        inputShowTime.click();
    } toggleTimeWidget();

    if (!(localStorage.getItem('isDateChecked')) || localStorage.getItem('isDateChecked') == 'yes') {
        inputShowDate.click();
    } toggleDateWidget();

    if (!(localStorage.getItem('isGreetingChecked')) || localStorage.getItem('isGreetingChecked') == 'yes') {
        inputShowGreeting.click();
    } toggleGreetingWidget();

    if (!(localStorage.getItem('isQuoteChecked')) || localStorage.getItem('isQuoteChecked') == 'yes') {
        inputShowQuote.click();
    } toggleQuoteWidget();

    if (!(localStorage.getItem('isWeatherChecked')) || localStorage.getItem('isWeatherChecked') == 'yes') {
        inputShowWeather.click();
    } toggleWeatherWidget();

    if (!(localStorage.getItem('isPlayerChecked')) || localStorage.getItem('isPlayerChecked') == 'yes') {
        inputShowPlayer.click();
    } togglePlayerWidget();
}

export function settingsClose() {
    settingsPopup.style.display = 'none';
    buttonClose.style.display = 'none';
}

export function showSettings(){
    settingsPopup.style.display = 'unset';
    buttonClose.style.display = 'unset';
}
