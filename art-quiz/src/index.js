import showStartPage from './js/pages/start-page/show-start-page.js';
import App from './js/app/index.js';

showStartPage();

async function start() {
    await App.buildState();
}

start();

/* eslint-disable-next-line no-console */
console.log('Анимация:    - плавное появление окна с правильным ответом.');
