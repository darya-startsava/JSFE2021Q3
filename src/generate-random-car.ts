export function generateRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const carBrand = ['Fiat', 'Jeep', 'Mercedes', 'Renault', 'Peugeot', 'Opel', 'Ford', 'Audi', 'Toyota', 'Nissan'];
const carModel = ['Micra', 'Qashqai', 'Juke', 'Patrol', 'X-Trail', 'Ariya', 'Leaf', 'Navara', 'Townstar', 'Kicks'];

function getRandomArrayItem(array: string[]): string {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

export function generateRandomCarName(): string {
    return `${getRandomArrayItem(carBrand)} ${getRandomArrayItem(carModel)}`;
}
