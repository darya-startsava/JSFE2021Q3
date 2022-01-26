import ServerUrl from './enums/server-url-enum';
import JSONValue from './types/json-value-type';
import store from './store';
import JSONDriveInform from './types/json-drive-information';
import JSONStartInform from './types/json-start-information';
import store2 from './store2';
import Sort from './enums/sort-enum';
import Order from './enums/order-enum';
import JSONWinnerInform from './types/json-winner-information';
import animation from './animation';

export default async function getCars(
    page = store.carPage,
    limit = store.NUMBER_OF_CARS_ON_PAGE
): Promise<{ carsArray: [JSONValue]; count: number }> {
    const response = await fetch(`${ServerUrl.garage}?_page=${page}&_limit=${limit}`);
    const carsArray = await response.json();
    const count = Number(response.headers.get('X-Total-Count'));
    return { carsArray, count };
}

export async function getCar(id: Number): Promise<JSONValue> {
    const car = await (await fetch(`${ServerUrl.garage}/${id}`)).json();
    return car;
}

export async function createCar(newCar: object): Promise<JSONValue> {
    const response = await fetch(ServerUrl.garage, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCar),
    });
    const car = await response.json();
    return car;
}

async function deleteWinner(id: number): Promise<JSONWinnerInform> {
    const response = await fetch(`${ServerUrl.winners}/${id}`, {
        method: 'DELETE',
    });
    const deleted = await response.json();
    return deleted;
}

export async function deleteCar(id: number): Promise<JSONValue> {
    const response = await fetch(`${ServerUrl.garage}/${id}`, {
        method: 'DELETE',
    });
    const deleted = await response.json();
    await deleteWinner(id);
    return deleted;
}

export async function updateCar(id: number, updatedCar: { name: string; color: string }): Promise<JSONValue> {
    const response = await fetch(`${ServerUrl.garage}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCar),
    });
    const car = await response.json();
    return car;
}

export async function startEngine(id: number): Promise<{ time: number; id: number }> {
    if (store.stoppedArray.includes(id)) {
        store.stoppedArray.splice(store.stoppedArray.indexOf(id), 1);
    }
    if (store.falseArray.includes(id)) {
        store.falseArray.splice(store.stoppedArray.indexOf(id), 1);
    }
    const response = await fetch(`${ServerUrl.engine}/?id=${id}&status=started`, { method: 'PATCH' });
    const start = await response.json();
    const time = Math.round(start.distance / start.velocity / 10) / 100;
    return { time, id };
}

export async function drive(id: number): Promise<JSONDriveInform> {
    const response = await fetch(`${ServerUrl.engine}/?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    const result = response.status;
    return result !== 200 ? { success: false } : { ...(await response.json()) };
}

export async function go(id: number): Promise<JSONDriveInform> {
    const { time } = await startEngine(id);
    animation(id, time);
    const answer = await drive(id);
    if (answer.success === false) {
        store.falseArray.push(id);
    }
    return answer;
}

async function createWinner(newWinner: object): Promise<JSONWinnerInform> {
    const response = await fetch(ServerUrl.winners, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWinner),
    });
    const winner = await response.json();
    return winner;
}

async function updateWinner(
    id: number,
    winnerCar: { wins: number; time: number }
): Promise<{ wins: number; time: number }> {
    const response = await fetch(`${ServerUrl.winners}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(winnerCar),
    });
    const winner = await response.json();
    return winner;
}

export async function getWinners(
    sort: Sort,
    order: Order,
    page = store.winnersPage,
    limit = store.NUMBER_OF_WINNERS_ON_PAGE
): Promise<{ winnersArray: [JSONWinnerInform]; winnersCount: number }> {
    const response = await fetch(`${ServerUrl.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
    const winnersArray = await response.json();
    const winnersCount = Number(response.headers.get('X-Total-Count'));
    return { winnersArray, winnersCount };
}

export async function race(time: number, id: number): Promise<JSONDriveInform> {
    animation(id, time);
    const answer = await drive(id);
    if (answer.success === true) {
        const winnerPopup = document.querySelector('.winner-popup');
        if (!store.isReset && winnerPopup && winnerPopup.innerHTML === '') {
            winnerPopup.innerHTML = `The winner is: ${
                store2.carsArray.find((item) => item.id === id)?.name
            } (${time}s)`;
            const { winnersArray } = await getWinners(Sort.id, Order.ASC);
            const winnerAgain = winnersArray.find((item) => item.id === id);
            if (winnerAgain) {
                const newTime = Math.min(winnerAgain.time, time);
                await updateWinner(winnerAgain.id, { wins: winnerAgain.wins + 1, time: newTime });
            } else {
                await createWinner({ id, wins: 1, time });
                store2.winnersCount += 1;
            }
        }
    } else {
        store.falseArray.push(id);
    }
    return answer;
}

export async function stopEngine(id: number): Promise<JSONStartInform> {
    const response = await fetch(`${ServerUrl.engine}/?id=${id}&status=stopped`, { method: 'PATCH' });
    const stop = await response.json();
    store.stoppedArray.push(id);
    return stop;
}

export async function getWinnersArray(sort: Sort, order: Order): Promise<Array<JSONValue>> {
    const result = await getWinners(sort, order);
    const idArray = result.winnersArray.map((item) => item.id);
    const promiseArray = [];
    for (let i = 0; i < idArray.length; i++) {
        promiseArray.push(getCar(idArray[i]));
    }
    const carArray = await Promise.all(promiseArray);
    return carArray;
}
