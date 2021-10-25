import { getLocalizedString } from './localization-strings.js'

const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const greetingContainer = document.querySelector('.greeting-container');


function getGreeting() {
    const date = new Date;
    const hour = date.getHours();
    switch (Math.floor(hour / 6)) {
        case 1:
            return getLocalizedString('greeting.morning');
        case 2:
            return getLocalizedString('greeting.afternoon');
        case 3:
            return getLocalizedString('greeting.evening');
        case 0:
            return getLocalizedString('greeting.night');
    }
}

function showGreeting() {
    greeting.textContent = getGreeting();
    name.placeholder = localStorage.getItem('name') || getLocalizedString('placeholder.name');
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}


export { greetingContainer, showGreeting, setLocalStorage, getLocalStorage };