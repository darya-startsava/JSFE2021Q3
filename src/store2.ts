import getCars, { getWinners } from './api';
import Order from './enums/order-enum';
import Sort from './enums/sort-enum';
import JSONValue from './types/json-value-type';
import JSONWinnerInform from './types/json-winner-information';

const { carsArray, count } = await getCars();
const { winnersArray, winnersCount } = await getWinners(Sort.id, Order.ASC);

const store2: { carsArray: [JSONValue]; count: number; winnersArray: [JSONWinnerInform]; winnersCount: number } = {
    carsArray,
    count,
    winnersArray,
    winnersCount,
};

export default store2;
