import showStartPage from './js/pages/show-start-page.js';
import App from './js/app/index.js';

showStartPage();

async function start() {
    await App.buildState();
}

start();

/* eslint-disable no-console */
console.log('Анимация:    - плавное появление окна с правильным ответом.');
/* eslint-enable no-console */
