import getCars from './api';
import JSONValue from './types/json-value-type';

const { carsArray, count } = await getCars();

const store2: { carsArray: [JSONValue]; count: number } = {
    carsArray,
    count,
};

export default store2;
