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
import Sorter from './sorts/sort/sort';

export async function bootstrap(): Promise<void> {
    const result = await readData();
    const countCards = 60;
    const toyCards: ToyCard[] = [];
    for (let i = 0; i < countCards; i++) {
        const { num, name, count, year, shape, color, size, favorite } = result[i];
        const toyCard = new ToyCard(num, name, count, year, shape, color, size, favorite);
        toyCard.loadChosen();
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

    function onFilter() {
        const filteredName = nameFilter.filter(toyCards);
        const filteredShape = shapeFilter.filter(filteredName);
        const filteredColor = colorFilter.filter(filteredShape);
        const filteredSize = sizeFilter.filter(filteredColor);
        const filteredFavorite = favoriteFilter.filter(filteredSize);
        const filteredCount = countFilter.filter(filteredFavorite);
        const filteredYear = yearFilter.filter(filteredCount);
        const sorted = sorter.sort(filteredYear);
        renderCards(sorted);
    }

    const nameFilter = new NameFilter(onFilter);
    const shapeFilter = new ShapeFilter(onFilter);
    const colorFilter = new ColorFilter(onFilter);
    const sizeFilter = new SizeFilter(onFilter);
    const favoriteFilter = new FavoriteFilter(onFilter);
    const countFilter = new CountFilter(onFilter);
    const yearFilter = new YearFilter(onFilter);
    const sorter = new Sorter(onFilter);

    onFilter();

    function loadFilters() {
        shapeFilter.loadFilter();
        colorFilter.loadFilter();
        sizeFilter.loadFilter();
        favoriteFilter.loadFilter();
        countFilter.loadFilter();
        sorter.loadFilter();
    }

    loadFilters();

    function resetOnClick() {
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
    }

    const resetFilters = document.querySelector<HTMLInputElement>('.reset-filters');
    resetFilters.addEventListener('click', () => {
        resetOnClick();
    });

    const resetLocalStorage = document.querySelector<HTMLElement>('.reset-localStorage');
    resetLocalStorage.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    });
}
