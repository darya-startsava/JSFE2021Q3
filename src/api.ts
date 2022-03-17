import * as constants from './constants';
import JSONValue from './types/json-value-type';
import UIStorage from './storages/UI-storage';
import JSONDriveInform from './types/json-drive-information';
import JSONStartInform from './types/json-start-information';
import Sort from './enums/sort-enum';
import Order from './enums/order-enum';
import JSONWinnerInform from './types/json-winner-information';
import animation from './animation';
import { showRaceWinnerPopup } from './pages/utils';
import ResponseStatus from './enums/response-status-enum';

export default async function getCars(
    page = UIStorage.carPage,
    limit = UIStorage.NUMBER_OF_CARS_ON_PAGE
): Promise<{ carsArray: [JSONValue]; count: number }> {
    const response = await fetch(`${constants.garageUrl}?_page=${page}&_limit=${limit}`);
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const carsArray = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { carsArray, count };
}

export async function getCar(id: Number): Promise<JSONValue> {
    const response = await fetch(`${constants.garageUrl}/${id}`);
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const car = await response.json();
    return car;
}

export async function createCar(newCar: object): Promise<JSONValue> {
    const response = await fetch(constants.garageUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
    });
    if (response.status !== ResponseStatus.CREATED) {
        throw new Error('Error has occurred');
    }
    const car = await response.json();
    return car;
}

async function deleteWinner(id: number): Promise<JSONWinnerInform> {
    const response = await fetch(`${constants.winnersUrl}/${id}`, {
        method: 'DELETE',
    });
    if (response.status !== ResponseStatus.OK && response.status !== ResponseStatus.NOT_FOUND) {
        throw new Error('Error has occurred');
    }
    const deleted = await response.json();
    return deleted;
}

export async function deleteCar(id: number): Promise<JSONValue> {
    const response = await fetch(`${constants.garageUrl}/${id}`, {
        method: 'DELETE',
    });
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const deleted = await response.json();
    await deleteWinner(id);
    return deleted;
}

export async function updateCar(id: number, updatedCar: { name: string; color: string }): Promise<JSONValue> {
    const response = await fetch(`${constants.garageUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar),
    });
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const car = await response.json();
    return car;
}

export async function startEngine(id: number): Promise<{ time: number; id: number }> {
    if (UIStorage.stoppedArray.includes(id)) {
        UIStorage.stoppedArray.splice(UIStorage.stoppedArray.indexOf(id), 1);
    }
    if (UIStorage.falseArray.includes(id)) {
        UIStorage.falseArray.splice(UIStorage.stoppedArray.indexOf(id), 1);
    }
    const response = await fetch(`${constants.engineUrl}/?id=${id}&status=started`, { method: 'PATCH' });
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const start = await response.json();
    const time = Math.round(start.distance / start.velocity / 10) / 100;
    return { time, id };
}

export async function drive(id: number): Promise<JSONDriveInform> {
    const response = await fetch(`${constants.engineUrl}/?id=${id}&status=drive`, { method: 'PATCH' });
    const result = response.status;
    if (result !== ResponseStatus.OK && result !== ResponseStatus.INTERNAL_SERVER_ERROR) {
        throw new Error('Error has occurred');
    }
    return result !== 200 ? { success: false } : { ...(await response.json()) };
}

export async function go(id: number): Promise<JSONDriveInform> {
    const { time } = await startEngine(id);
    requestAnimationFrame(() => animation(id, time));
    const answer = await drive(id);
    if (answer.success === false) {
        UIStorage.falseArray.push(id);
    }
    return answer;
}

export async function createWinner(newWinner: object): Promise<JSONWinnerInform> {
    const response = await fetch(constants.winnersUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWinner),
    });
    if (response.status !== ResponseStatus.CREATED) {
        throw new Error('Error has occurred');
    }
    const winner = await response.json();
    return winner;
}

export async function updateWinner(
    id: number,
    winnerCar: { wins: number; time: number }
): Promise<{ wins: number; time: number }> {
    const response = await fetch(`${constants.winnersUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(winnerCar),
    });
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const winner = await response.json();
    return winner;
}

export async function getWinners(
    sort: Sort,
    order: Order,
    page = UIStorage.winnersPage,
    limit = UIStorage.NUMBER_OF_WINNERS_ON_PAGE
): Promise<{ winnersArray: [JSONWinnerInform]; winnersCount: number }> {
    const response = await fetch(`${constants.winnersUrl}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const winnersArray = await response.json();
    const winnersCount = Number(response.headers.get('X-Total-Count'));
    return { winnersArray, winnersCount };
}

export async function race(currentRace: number, time: number, id: number): Promise<JSONDriveInform> {
    requestAnimationFrame(() => animation(id, time));
    const answer = await drive(id);
    if (currentRace === UIStorage.currentRace) {
        if (answer.success === true) {
            await showRaceWinnerPopup(id, time);
        } else {
            UIStorage.falseArray.push(id);
        }
    }
    return answer;
}

export async function stopEngine(id: number): Promise<JSONStartInform> {
    const response = await fetch(`${constants.engineUrl}/?id=${id}&status=stopped`, { method: 'PATCH' });
    if (response.status !== ResponseStatus.OK) {
        throw new Error('Error has occurred');
    }
    const stop = await response.json();
    UIStorage.stoppedArray.push(id);
    return stop;
}

export async function getWinnersArray(sort: Sort, order: Order): Promise<Array<JSONValue>> {
    const result = await getWinners(sort, order);
    return Promise.all(result.winnersArray.map((item) => item.id).map(getCar));
}
