import ServerUrl from './enums/server-url-enum';
import JSONValue from './types/json-value-type';
import store from './store';

export default async function getCars(
    page = store.carPage,
    limit = 7
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
