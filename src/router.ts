import renderGaragePage from './pages/garage';
import renderWinnerPage from './pages/winner';
import Hash from './enums/hash-enum';

export function locationHashChanged(): void {
    if (window.location.hash === Hash.garage) {
        renderGaragePage();
    } else if (window.location.hash === Hash.winners) {
        renderWinnerPage();
    }
}

export function goToWinnerPage(): void {
    window.location.hash = Hash.winners;
    renderWinnerPage();
}

export function goToGaragePage(): void {
    window.location.hash = Hash.garage;
    renderGaragePage();
}
