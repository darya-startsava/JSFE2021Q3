import ServerUrl from './enums/server-url-enum';
import JSONValue from './types/json-value-type';

export default async function getCars(): Promise<[JSONValue]> {
    const carsArray = await (await fetch(ServerUrl.garage)).json();
    return carsArray;
}

export async function getCar(id: Number): Promise<JSONValue> {
    const car = await (await fetch(`${ServerUrl.garage}/${id}`)).json();
    return car;
}
