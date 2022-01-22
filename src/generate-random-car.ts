const COUNT_COLOR_HEX_SYMBOLS = 6;

export function generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < COUNT_COLOR_HEX_SYMBOLS; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
