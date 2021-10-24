export let currentLanguage = localStorage.getItem('lang') || 'en';
export const inputsLanguage = document.querySelectorAll('.input-language');
const labelsLanguage = document.querySelectorAll('.language');


const strings = {
    en: {
        'greeting.morning': 'Good morning,',
        'greeting.afternoon': 'Good afternoon,',
        'greeting.evening': 'Good evening,',
        'greeting.night': 'Good night,',
        'placeholder.name': '[Enter your name]',
        'date.language': 'en-US',
        'default.city': 'Minsk',
        'weather.wind': 'Wind speed:',
        'wind.dimension': 'm/s',
        'weather.humidity': 'Humidity:',
    },
    ru: {
        'greeting.morning': 'Доброе утро,',
        'greeting.afternoon': 'Добрый день,',
        'greeting.evening': 'Добрый вечер,',
        'greeting.night': 'Доброй ночи,',
        'placeholder.name': '[Ваше имя]',
        'date.language': 'ru-RU',
        'default.city': 'Минск',
        'weather.wind': 'Скорость ветра:',
        'wind.dimension': 'м/с',
        'weather.humidity': 'Влажность:',
    }
};

export function getLocalizedString(key) {
    return strings[currentLanguage][key];
}



function changeLanguage(setLanguage) {
    localStorage.setItem('lang', setLanguage);
    location.reload();
}

export function changeLanguageIcon() {
    labelsLanguage.forEach((item) => { item.classList.remove('language-active') });
    if (currentLanguage == 'en') {
        labelsLanguage[0].classList.add('language-active');
    } else labelsLanguage[1].classList.add('language-active');
}

export function changeLanguageRadiobutton(item, index) {
    changeLanguage(item.value);

}



