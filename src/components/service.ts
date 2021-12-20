const toysInformation = './assets/json/data.json';

export default async function readData() {
    const res = await fetch(toysInformation);
    const data = await res.json();
    return data;
}
