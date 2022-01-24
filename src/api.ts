import ServerUrl from './enums/server-url-enum';
import JSONValue from './types/json-value-type';
import store from './store';
import JSONDriveInform from './types/json-drive-information';
import JSONStartInform from './types/json-start-information';
import store2 from './store2';
import Sort from './enums/sort-enum';
import Order from './enums/order-enum';
import JSONWinnerInform from './types/json-winner-information';

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

export async function deleteCar(id: number): Promise<JSONValue> {
    const response = await fetch(`${ServerUrl.garage}/${id}`, {
        method: 'DELETE',
    });
    const deleted = await response.json();
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

export async function startEngine(id: number): Promise<JSONStartInform> {
    const response = await fetch(`${ServerUrl.engine}/?id=${id}&status=started`, { method: 'PATCH' });
    const start = await response.json();
    console.log(start);
    return start;
}

export async function drive(id: number): Promise<JSONDriveInform> {
    const response = await fetch(`${ServerUrl.engine}/?id=${id}&status=drive`, { method: 'PATCH' }).catch();
    const result = response.status;
    return result !== 200 ? { success: false } : { ...(await response.json()) };
}

export async function go(id: number): Promise<JSONDriveInform> {
    await startEngine(id);
    const answer = await drive(id);
    console.log(answer);
    return answer;
}

export async function race(id: number): Promise<JSONDriveInform> {
    await startEngine(id);
    const answer = await drive(id);
    console.log('answer:', answer);
    if (answer.success === true) {
        console.log('id:', id);
        const winnerPopup = document.querySelector('.winner-popup');
        if (winnerPopup && winnerPopup.innerHTML === '') {
            winnerPopup.innerHTML = `The winner is: ${store2.carsArray.find((item) => item.id === id)?.name}`;
        }
    }
    return answer;
}

export async function stopEngine(id: number): Promise<JSONStartInform> {
    const response = await fetch(`${ServerUrl.engine}/?id=${id}&status=stopped`, { method: 'PATCH' });
    const stop = await response.json();
    console.log(stop);
    return stop;
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
