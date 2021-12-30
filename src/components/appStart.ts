import StartPage from './start-page/start-page';
import { bootstrap as bootstrapToys } from './appToys';

export function bootstrap() {
    const decorationImages = document?.querySelectorAll<HTMLElement>('.decoration-image');
    if (decorationImages) {
        decorationImages.forEach((item) => {
            if (item.dataset.onTree === 'true') {
                item.style.opacity = '0';
            }
        });
    }
    const startPage = new StartPage();
    function renderMain() {
        startPage.render();
    }

    renderMain();

    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', () => bootstrapToys());
}
