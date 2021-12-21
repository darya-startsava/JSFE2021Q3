import ToyCard from '../toy-card/toy-card';

export default interface Filter {
    filter(toyCards: ToyCard[]): ToyCard[];
}
