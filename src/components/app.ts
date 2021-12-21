import './range/range';
import ToyCard from './toy-card/toy-card';
import readData from './service';
import NameFilter from './filters/name-filter/name-filter';

export async function bootstrap(): Promise<void> {
    const result = await readData();
    const countCards = 60;
    const toyCards: ToyCard[] = [];
    for (let i = 0; i < countCards; i++) {
        const { num, name, count, year, shape, color, size, favorite } = result[i];
        const toyCard = new ToyCard(num, name, count, year, shape, color, size, favorite);
        toyCards.push(toyCard);
    }
    function renderCards(toyCards: ToyCard[]) {
        const toysSection = document.querySelector('.toys-section');
        toysSection.innerHTML = '';
        for (const item of toyCards) {
            toysSection.append(item.render());
        }
        if (toyCards.length === 0) {
            alert('Извините, совпадений не обнаружено');
        }
    }
    renderCards(toyCards);

    new NameFilter(toyCards, (filteredToyCards) => renderCards(filteredToyCards));
}
