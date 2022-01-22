import renderGaragePage from './pages/garage';
import renderWinnerPage from './pages/winner';
import Hash from './enums/hash-enum';

export function locationHashChanged(): void {
    const hashPart = window.location.hash;
    if (hashPart.slice(0, hashPart.indexOf('-') + 1) === Hash.garage) {
        renderGaragePage();
    } else if (hashPart.slice(0, hashPart.indexOf('-') + 1) === Hash.winners) {
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
