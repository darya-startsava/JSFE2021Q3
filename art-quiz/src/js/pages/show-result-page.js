import showStartPage from './show-start-page.js';
import showQuizPage from './show-quiz-page.js';

const main = document.querySelector('main');

function showResultPage(type) {
    main.innerHTML = `<h3 class="title">Результаты раунда:</h3>
    <div class="result">7/10</div>
    <div class="results-wrapper">
        <div class="results">
            <button type="button" class="result-picture-button result-1-picture-button"></button>
            <button type="button" class="result-picture-button result-2-picture-button"></button>
            <button type="button" class="result-picture-button result-3-picture-button"></button>
            <button type="button" class="result-picture-button result-4-picture-button"></button>
            <button type="button" class="result-picture-button result-5-picture-button"></button>
            <button type="button" class="result-picture-button result-6-picture-button"></button>
            <button type="button" class="result-picture-button result-7-picture-button"></button>
            <button type="button" class="result-picture-button result-8-picture-button"></button>
            <button type="button" class="result-picture-button result-9-picture-button"></button>
            <button type="button" class="result-picture-button result-10-picture-button"></button>
        </div>
    </div>
    <div class="buttons-wrapper">
        <button type="button" class="back-to-button" id="back-to-start-button">На главную</button>
        <button type="button" class="back-to-button" id="back-to-categories-button">Категории</button>
    </div>`;
    const backToStartButton = document.querySelector('#back-to-start-button');
    const backToCategoriesButton = document.querySelector('#back-to-categories-button');

    backToStartButton.addEventListener('click', showStartPage);
    backToCategoriesButton.addEventListener('click', () => showQuizPage(type));
};

export default showResultPage;