import PrevNextButtons from '../components/prev-next-buttons/prev-next-buttons-winners';
import TableRow from '../components/winners-table/table-row';
import Winners from '../components/winners-table/winners-table';
import { getWinners, getWinnersArray } from '../api';
import Sort from '../enums/sort-enum';
import Order from '../enums/order-enum';
import store2 from '../store2';
import store from '../store';

async function loadWinners(sort: Sort, order: Order): Promise<TableRow[]> {
    const { winnersArray, winnersCount } = await getWinners(sort, order);
    store2.winnersArray = winnersArray;
    store2.winnersCount = winnersCount;
    const carArray = await getWinnersArray(sort, order);
    const tableRows: TableRow[] = [];
    for (let i = 0; i < winnersArray.length; i++) {
        const { id, wins, time } = winnersArray[i];
        const { name, color } = carArray[i];
        const tableRow = new TableRow(i + 1, name, color, id, wins, time);
        tableRows.push(tableRow);
    }
    return tableRows;
}

export default async function renderWinnerPage(sort: Sort, order: Order): Promise<void> {
    const tableRows = await loadWinners(sort, order);
    const main = document.querySelector('main');
    const winnersWrapper = document.createElement('div');
    winnersWrapper.classList.add('garage-wrapper');
    const winnersHeader = document.createElement('h2');
    const winnersPage = document.createElement('h3');
    winnersHeader.innerHTML = `Winners(${store2.winnersCount})`;
    winnersPage.innerHTML = `Page#${store.winnersPage}`;
    const winners = new Winners();
    const prevNextButtons = new PrevNextButtons();
    if (winnersWrapper) {
        winnersWrapper.innerHTML = '';
        winnersWrapper.append(winnersHeader);
        winnersWrapper.append(winnersPage);
        winnersWrapper.append(winners.render());
        winnersWrapper.append(prevNextButtons.render());
        if (main) {
            main.innerHTML = '';
            main.append(winnersWrapper);
        }
    }

    const tableBody = document.querySelector('.table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
    }
    function renderWinners(tableRows: TableRow[]): void {
        for (const item of tableRows) {
            tableBody?.append(item.render());
        }
    }
    renderWinners(tableRows);
}
