import './global.scss';
import './buttons.scss';
import renderGaragePage from './components/pages/garage-page';
import renderWinnerPage from './components/pages/winner-page';
import renderHeaderFooter from './components/pages/header-footer';
import Hash from './components/enums/hash-enum';

renderHeaderFooter();
renderGaragePage();

function locationHashChanged(): void {
    if (window.location.hash === Hash.garage) {
        renderGaragePage();
    } else if (window.location.hash === Hash.winners) {
        renderWinnerPage();
    }
}

const toWinners = document.querySelector('.button-winners');
toWinners?.addEventListener('click', () => {
    window.location.hash = Hash.winners;
    renderWinnerPage();
});

const toGarage = document.querySelector('.button-garage');
toGarage?.addEventListener('click', () => {
    window.location.hash = Hash.garage;
    renderGaragePage();
});

window.onhashchange = locationHashChanged;
window.onload = locationHashChanged;
