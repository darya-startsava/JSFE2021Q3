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
        'settings.language': 'Choose language:',
        'settings.en': 'English',
        'settings.ru': 'Russian',
        'settings.background':'Background:',
        'settings.background.exp': 'Take background from',
        'settings.tag': 'Tag:',
        'settings.tag.exp': 'Set background tag',
        'settings.show.hide': 'Show/hide:',
        'show.time': 'Time',
        'show.date': 'Date',
        'show.greeting': 'Greeting',
        'show.quote': 'Quote',
        'show.weather': 'Weather',
        'show.player':'Player',


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
        'settings.language': 'Выберите язык:',
        'settings.en': 'Английский',
        'settings.ru': 'Русский',
        'settings.background': 'Фон:',
        'settings.background.exp':'Источник фонового изображения',
        'settings.tag': 'Тег:',
        'settings.tag.exp': 'Установить тег для фона',
        'settings.show.hide': 'Показать/спрятать:',
        'show.time': 'Время',
        'show.date': 'Дата',
        'show.greeting': 'Приветствие',
        'show.quote': 'Цитата',
        'show.weather': 'Погода',
        'show.player':'Плеер',
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



