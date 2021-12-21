import ToyCard from '../toy-card/toy-card';

export default interface Sort {
    sort(toyCards: ToyCard[]): ToyCard[];
}
