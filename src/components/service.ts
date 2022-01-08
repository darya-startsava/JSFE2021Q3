const toysInformation = './assets/json/data.json';

type JSONValue = Array<{
    num: string;
    name: string;
    count: string;
    color: string;
    year: string;
    shape: string;
    size: string;
    favorite: boolean;
}>;

export default async function readData(): Promise<JSONValue> {
    const res = await fetch(toysInformation);
    const data = await res.json();
    return data;
}
