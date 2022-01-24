import './global.scss';
import './buttons.scss';
import renderGaragePage from './pages/garage';
import renderPageSection from './pages/utils';
import { locationHashChanged, goToWinnerPage, goToGaragePage } from './router';

renderPageSection();
renderGaragePage();

const toWinners = document.querySelector('.button-winners');
toWinners?.addEventListener('click', () => {
    goToWinnerPage();
});

const toGarage = document.querySelector('.button-garage');
toGarage?.addEventListener('click', () => {
    goToGaragePage();
});

window.onhashchange = locationHashChanged;
window.onload = locationHashChanged;
