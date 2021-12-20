import './range/range';
import ToyCard from './toy-card/toy-card';
import readData from './service';

export async function bootstrap(): Promise<void> {
    const result = await readData();
    const countCards = 60;
    for (let i = 0; i <= countCards; i++) {
        const toyCard = new ToyCard(
            result[i].num,
            result[i].name,
            result[i].count,
            result[i].year,
            result[i].shape,
            result[i].color,
            result[i].size,
            result[i].favorite
        );
        const toysSection = document.querySelector('.toys-section');
        toysSection.append(toyCard.render());
    }
}
