import './range/range';
import ToyCard from './toy-card/toy-card';
import readData from './service';
import NameFilter from './filters/name-filter/name-filter';
import ShapeFilter from './filters/shape-filter/shape-filter';
import ColorFilter from './filters/color-filter/color-filter';

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
        // if (toyCards.length === 0) {
        //     alert('Извините, совпадений не обнаружено');
        // }
    }
    renderCards(toyCards);

    const nameFilter = new NameFilter(toyCards, (filteredToyCards) => {
        const filteredShape = shapeFilter.filter(filteredToyCards);
        const filteredColor = colorFilter.filter(filteredShape);
        renderCards(filteredColor);
    });
    const shapeFilter = new ShapeFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredColor = colorFilter.filter(filteredName);
        renderCards(filteredColor);
    });
    const colorFilter = new ColorFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredShape = shapeFilter.filter(filteredName);
        renderCards(filteredShape);
    });
}
