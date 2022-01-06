export default function reset(): void {
    const searchInput = document.querySelector<HTMLInputElement>('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }

    const shapeButtons = document.querySelectorAll<HTMLInputElement>('.shape-button');
    shapeButtons.forEach((item) => item.classList.remove('active-shape-size'));

    const colorButtons = document.querySelectorAll<HTMLInputElement>('.color-button');
    colorButtons.forEach((item) => item.classList.remove('active-color'));

    const sizeButtons = document.querySelectorAll<HTMLInputElement>('.size-button');
    sizeButtons.forEach((item) => item.classList.remove('active-shape-size'));

    const favoriteCheckbox = document.querySelector<HTMLInputElement>('.favorite-checkbox');
    if (favoriteCheckbox) {
        favoriteCheckbox.checked = false;
    }
}
