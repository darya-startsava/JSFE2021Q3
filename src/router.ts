import renderGaragePage from './pages/garage';
import renderWinnerPage from './pages/winner';
import Hash from './enums/hash-enum';
import UIStorage from './storages/UI-storage';

export function locationHashChanged(): void {
    if (window.location.hash === Hash.garage) {
        renderGaragePage();
    } else if (window.location.hash === Hash.winners) {
        renderWinnerPage(UIStorage.sort, UIStorage.order);
    }
}

export function goToWinnerPage(): void {
    window.location.hash = Hash.winners;
    renderWinnerPage(UIStorage.sort, UIStorage.order);
}

export function goToGaragePage(): void {
    window.location.hash = Hash.garage;
    renderGaragePage();
}
