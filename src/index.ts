import './global.scss';
import './buttons.scss';

import renderGaragePage from './components/pages/garage-page';
import renderWinnerPage from './components/pages/winner-page';
import renderHeaderFooter from './components/pages/header-footer';

renderHeaderFooter();
renderGaragePage();

const toWinners = document.querySelector('.button-winners');
toWinners?.addEventListener('click', () => {
    renderWinnerPage();
});

const toGarage = document.querySelector('.button-garage');
toGarage?.addEventListener('click', () => {
    renderGaragePage();
});
