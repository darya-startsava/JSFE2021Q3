import StartPage from './start-page/start-page';
import { bootstrap as bootstrapToys } from './appToys';

export function bootstrap(): void {
    const decorationImages = document?.querySelectorAll<HTMLElement>('.decoration-image');
    if (decorationImages) {
        decorationImages.forEach((item) => {
            if (item.dataset.onTree === 'true') {
                item.style.opacity = '0';
            }
        });
    }
    const startPage = new StartPage();
    function renderMain(): void {
        startPage.render();
    }

    renderMain();

    const startButton = document.querySelector('.start-button');
    const headerStartButton = document.getElementById('start');
    const headerToysButton = document.getElementById('toys');
    startButton?.addEventListener('click', () => {
        headerStartButton?.classList.remove('active');
        headerToysButton?.classList.add('active');
        bootstrapToys();
    });
}
