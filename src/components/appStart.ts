import StartPage from './start-page/start-page';
import { bootstrap as bootstrapToys } from './appToys';

export function bootstrap() {
    const startPage = new StartPage();
    function renderMain() {
        startPage.render();
    }

    renderMain();

    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', () => bootstrapToys());
}
