import ToyCard from './toy-card/toy-card';
import readData from './service';
import NameFilter from './filters/name-filter/name-filter';
import ShapeFilter from './filters/shape-filter/shape-filter';
import ColorFilter from './filters/color-filter/color-filter';
import SizeFilter from './filters/size-filter/size-filter';
import FavoriteFilter from './filters/favorite-filter/favorite-filter';
import reset from './filters/reset-filters/reset-filters';
import CountFilter from './range/count-filter';
import YearFilter from './range/year-filter';

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

    const nameFilter = new NameFilter(toyCards, (filteredToyCards) => {
        const filteredShape = shapeFilter.filter(filteredToyCards);
        const filteredColor = colorFilter.filter(filteredShape);
        const filteredSize = sizeFilter.filter(filteredColor);
        const filteredFavorite = favoriteFilter.filter(filteredSize);
        const filteredCount = countFilter.filter(filteredFavorite);
        const filteredYear = yearFilter.filter(filteredCount);
        renderCards(filteredYear);
    });

    const shapeFilter = new ShapeFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredColor = colorFilter.filter(filteredName);
        const filteredSize = sizeFilter.filter(filteredColor);
        const filteredFavorite = favoriteFilter.filter(filteredSize);
        const filteredCount = countFilter.filter(filteredFavorite);
        const filteredYear = yearFilter.filter(filteredCount);
        renderCards(filteredYear);
    });

    const colorFilter = new ColorFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredShape = shapeFilter.filter(filteredName);
        const filteredSize = sizeFilter.filter(filteredShape);
        const filteredFavorite = favoriteFilter.filter(filteredSize);
        const filteredCount = countFilter.filter(filteredFavorite);
        const filteredYear = yearFilter.filter(filteredCount);
        renderCards(filteredYear);
    });

    const sizeFilter = new SizeFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredShape = shapeFilter.filter(filteredName);
        const filteredColor = colorFilter.filter(filteredShape);
        const filteredFavorite = favoriteFilter.filter(filteredColor);
        const filteredCount = countFilter.filter(filteredFavorite);
        const filteredYear = yearFilter.filter(filteredCount);
        renderCards(filteredYear);
    });

    const favoriteFilter = new FavoriteFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredShape = shapeFilter.filter(filteredName);
        const filteredColor = colorFilter.filter(filteredShape);
        const filteredSize = sizeFilter.filter(filteredColor);
        const filteredCount = countFilter.filter(filteredSize);
        const filteredYear = yearFilter.filter(filteredCount);
        renderCards(filteredYear);
    });

    const countFilter = new CountFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredShape = shapeFilter.filter(filteredName);
        const filteredColor = colorFilter.filter(filteredShape);
        const filteredSize = sizeFilter.filter(filteredColor);
        const filteredFavorite = favoriteFilter.filter(filteredSize);
        const filteredYear = yearFilter.filter(filteredFavorite);
        renderCards(filteredYear);
    });

    const yearFilter = new YearFilter(toyCards, (filteredToyCards) => {
        const filteredName = nameFilter.filter(filteredToyCards);
        const filteredShape = shapeFilter.filter(filteredName);
        const filteredColor = colorFilter.filter(filteredShape);
        const filteredSize = sizeFilter.filter(filteredColor);
        const filteredFavorite = favoriteFilter.filter(filteredSize);
        const filteredCount = countFilter.filter(filteredFavorite);
        renderCards(filteredCount);
    });

    const resetFilters = document.querySelector<HTMLInputElement>('.reset-filters');
    resetFilters.addEventListener('click', () => {
        reset();
        nameFilter.text = '';
        shapeFilter.shapes = [];
        colorFilter.colors = [];
        sizeFilter.sizes = [];
        favoriteFilter.isFavorite = false;
        renderCards(toyCards);
        countFilter.minCurrentCount = 1;
        countFilter.maxCurrentCount = 12;
        yearFilter.minCurrentYear = 1940;
        yearFilter.maxCurrentYear = 2020;
    });
}
