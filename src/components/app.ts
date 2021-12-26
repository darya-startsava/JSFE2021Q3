import ToysPage from './toys-page/toys-page';
import ToyCard from './toy-card/toy-card';
import readData from './service';
import chosenSingleton from './chosen/chosen';
import Filters from './filters/common/filters';
import Range from './filters/range/range';
import NameFilter from './filters/name-filter/name-filter';
import ShapeFilter from './filters/shape-filter/shape-filter';
import ColorFilter from './filters/color-filter/color-filter';
import SizeFilter from './filters/size-filter/size-filter';
import FavoriteFilter from './filters/favorite-filter/favorite-filter';
import reset from './filters/reset-filters/reset-filters';
import CountFilter, { maxCount, minCount } from './filters/range/count-filter';
import YearFilter, { maxYear, minYear } from './filters/range/year-filter';
import Sorter from './sorts/sort/sort';
import Popup from './popup/popup';

export async function bootstrap(): Promise<void> {
    const toysPage = new ToysPage();
    const filters = new Filters();
    const range = new Range();
    const popup = new Popup('Извините, совпадений не обнаружено');

    function renderMain() {
        toysPage.render();
    }

    function renderFiltersSection() {
        const filterSection = document.querySelector('.filter-section');
        filterSection.prepend(filters.render());
        filterSection.append(popup.render());
        const filterWrapper = document.querySelector('.filter-wrapper');
        filterWrapper.append(range.render());
    }

    renderMain();
    renderFiltersSection();

    const nameFilter = new NameFilter(onFilter);
    const shapeFilter = new ShapeFilter(onFilter);
    const colorFilter = new ColorFilter(onFilter);
    const sizeFilter = new SizeFilter(onFilter);
    const favoriteFilter = new FavoriteFilter(onFilter);
    const countFilter = new CountFilter(onFilter);
    const yearFilter = new YearFilter(onFilter);
    const sorter = new Sorter(onFilter);

    function renderNameFilter() {
        const searchChosenSortSection = document.querySelector('.search-chosen-sort-section');
        searchChosenSortSection.prepend(nameFilter.render());
    }
    function renderChosen() {
        const searchChosenSortSection = document.querySelector('.search-chosen-sort-section');
        searchChosenSortSection.append(chosenSingleton.render());
    }
    function renderSort() {
        const searchChosenSortSection = document.querySelector('.search-chosen-sort-section');
        searchChosenSortSection.append(sorter.render());
    }
    function renderRangeFilters() {
        const sliderQuantity = document.getElementById('slider-quantity');
        sliderQuantity.append(countFilter.render());

        const sliderYear = document.getElementById('slider-year');
        sliderYear.append(yearFilter.render());
    }
    function renderAppearanceFilters() {
        const appearanceFilter = document.querySelector('.appearance-filter');
        appearanceFilter.append(shapeFilter.render());
        appearanceFilter.append(colorFilter.render());
        appearanceFilter.append(sizeFilter.render());
        appearanceFilter.append(favoriteFilter.render());
    }

    renderNameFilter();
    renderChosen();
    renderSort();
    renderAppearanceFilters();
    renderRangeFilters();

    const toyCards = await loadCards();

    function renderCards(toyCards: ToyCard[]) {
        const toysSection = document.querySelector('.toys-section');
        toysSection.innerHTML = '';
        for (const item of toyCards) {
            toysSection.append(item.render());
        }
        if (toyCards.length === 0) {
            popup.showPopup();
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

    onFilter();

    function resetOnClick() {
        reset();
        nameFilter.text = '';
        shapeFilter.shapes = [];
        colorFilter.colors = [];
        sizeFilter.sizes = [];
        favoriteFilter.isFavorite = false;
        countFilter.resetFilter();
        yearFilter.resetFilter();
        countFilter.minCurrentCount = minCount;
        countFilter.maxCurrentCount = maxCount;
        yearFilter.minCurrentYear = minYear;
        yearFilter.maxCurrentYear = maxYear;
        onFilter();
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

async function loadCards(): Promise<ToyCard[]> {
    const result = await readData();
    const countCards = 60;
    const toyCards: ToyCard[] = [];
    for (let i = 0; i < countCards; i++) {
        const { num, name, count, year, shape, color, size, favorite } = result[i];
        const toyCard = new ToyCard(num, name, count, year, shape, color, size, favorite);
        toyCard.loadChosen();
        toyCards.push(toyCard);
    }
    return toyCards;
}
