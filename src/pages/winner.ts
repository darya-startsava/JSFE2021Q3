import PrevNextButtons from '../components/prev-next-buttons/prev-next-buttons';
import Winners from '../components/winners-table/winners-table';

export default function renderWinnerPage(): void {
    const main = document.querySelector('main');
    const winnersHeader = document.createElement('h2');
    const winnersPage = document.createElement('h3');
    winnersHeader.innerHTML = 'Winners(4)';
    winnersPage.innerHTML = 'Page#1';
    const winners = new Winners();
    const prevNextButtons = new PrevNextButtons();
    if (main) {
        main.innerHTML = '';
        main.append(winnersHeader);
        main.append(winnersPage);
        main.append(winners.render());
        main.append(prevNextButtons.render());
    }
}
