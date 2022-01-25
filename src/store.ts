const store: {
    carPage: number;
    NUMBER_OF_CARS_ON_PAGE: number;
    selectedCarId: number | undefined;
    winnersPage: number;
    NUMBER_OF_WINNERS_ON_PAGE: number;
    falseArray: Array<number>;
    resetArray: Array<number>;
    isReset: boolean;
} = {
    carPage: 1,
    NUMBER_OF_CARS_ON_PAGE: 7,
    selectedCarId: undefined,
    winnersPage: 1,
    NUMBER_OF_WINNERS_ON_PAGE: 10,
    falseArray: [],
    resetArray: [],
    isReset: false,
};

export default store;
