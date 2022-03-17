import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import dataStorage from '../storages/data-storage';
import UIStorage from '../storages/UI-storage';
import Sort from '../enums/sort-enum';
import Order from '../enums/order-enum';
import { getWinners, updateWinner, createWinner } from '../api';

export default function renderPageSections(): void {
    const header = new Header();
    const footer = new Footer();
    const body = document.querySelector('body');
    if (body) {
        body.append(header.render());
        body.append(document.createElement('main'));
        body.append(footer.render());
    }
}

export async function showRaceWinnerPopup(id: number, time: number): Promise<void> {
    const winnerPopup = document.querySelector('.winner-popup');
    if (!UIStorage.isReset && winnerPopup && winnerPopup.innerHTML === '') {
        winnerPopup.innerHTML = `The winner is: ${
            dataStorage.carsArray.find((item) => item.id === id)?.name
        } (${time}s)`;
        const { winnersArray } = await getWinners(Sort.id, Order.ASC);
        const winnerAgain = winnersArray.find((item) => item.id === id);
        if (winnerAgain) {
            const newTime = Math.min(winnerAgain.time, time);
            await updateWinner(winnerAgain.id, { wins: winnerAgain.wins + 1, time: newTime });
        } else {
            await createWinner({ id, wins: 1, time });
            dataStorage.winnersCount++;
        }
    }
}
