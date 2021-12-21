import { countSlider } from '../../range/count-filter';

export default function reset(): void {
    const searchInput = document.querySelector<HTMLInputElement>('.search-input');
    searchInput.value = '';
    const shapeButtons = document.querySelectorAll<HTMLInputElement>('.shape-button');
    shapeButtons.forEach((item) => item.classList.remove('active-shape-size'));
    const colorButtons = document.querySelectorAll<HTMLInputElement>('.color-button');
    colorButtons.forEach((item) => item.classList.remove('active-color'));
    const sizeButtons = document.querySelectorAll<HTMLInputElement>('.size-button');
    sizeButtons.forEach((item) => item.classList.remove('active-shape-size'));
    const favoriteCheckbox = document.querySelector<HTMLInputElement>('.favorite-checkbox');
    favoriteCheckbox.checked = false;
    const slider = document.querySelectorAll<HTMLInputElement>('.noUi-handle-lower');

    countSlider.on('set.one', () => {
        slider[0].ariaValueNow = '1';
        slider[0].ariaValueMax = '12';
        slider[1].ariaValueNow = '1940';
        slider[1].ariaValueMax = '2020';
    });
}
