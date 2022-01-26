import Order from './enums/order-enum';
import Sort from './enums/sort-enum';

const store: {
    carPage: number;
    NUMBER_OF_CARS_ON_PAGE: number;
    selectedCarId: number | undefined;
    winnersPage: number;
    NUMBER_OF_WINNERS_ON_PAGE: number;
    falseArray: Array<number>;
    resetArray: Array<number>;
    isReset: boolean;
    stoppedArray: Array<number>;
    sort: Sort;
    order: Order;
    currentRace: number;
} = {
    carPage: 1,
    NUMBER_OF_CARS_ON_PAGE: 7,
    selectedCarId: undefined,
    winnersPage: 1,
    NUMBER_OF_WINNERS_ON_PAGE: 10,
    falseArray: [],
    resetArray: [],
    isReset: false,
    stoppedArray: [],
    sort: Sort.id,
    order: Order.ASC,
    currentRace: 1,
};

export default store;
