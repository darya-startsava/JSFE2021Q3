import './range/range';
import ToyCard from './toy-card/toy-card';
import readData from './service';

export async function bootstrap(): Promise<void> {
    const result = await readData();
    const countCards = 60;
    for (let i = 0; i < countCards; i++) {
        const { num, name, сount, year, shape, color, size, favorite } = result[i];
        const toyCard = new ToyCard(num, name, сount, year, shape, color, size, favorite);
        const toysSection = document.querySelector('.toys-section');
        toysSection.append(toyCard.render());
    }
}
