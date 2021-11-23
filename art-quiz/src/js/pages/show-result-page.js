import showStartPage from './show-start-page.js';
import showQuizPage from './show-quiz-page.js';
import App from '../app/index.js';

const main = document.querySelector('main');

function showResultPage(type, index) {
    main.innerHTML = `<h3 class="title">Результаты раунда:</h3>
    <div class="result"></div>
    <div class="results-wrapper">
        <div class="results">
        </div>
    </div>
    <div class="buttons-wrapper">
        <button type="button" class="back-to-button" id="back-to-start-button">На главную</button>
        <button type="button" class="back-to-button" id="back-to-categories-button">Категории</button>
    </div>`;
    const backToStartButton = document.querySelector('#back-to-start-button');
    const backToCategoriesButton = document.querySelector('#back-to-categories-button');
    const results = document.querySelector('.results');
    const result = document.querySelector('.result');

    let counterRightAnswers = 0;
    function createResultPicture() {
        for (let i = 0; i < 10; i++) {
            const { imageNum } = App.categories[index].questions[i];
            const image = `url('https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${imageNum}.jpg')`;
            const resultPictureButton = document.createElement('button');
            resultPictureButton.classList.add('result-picture-button');
            resultPictureButton.classList.add('button-grayscale');
            if (App.categories[index].questions[i].status === 'right') {
                counterRightAnswers++;
                resultPictureButton.classList.remove('button-grayscale');
            }

            resultPictureButton.style.backgroundImage = `${image}`;
            results.append(resultPictureButton);
            result.innerHTML = `${counterRightAnswers}/10`;
        }
    }

    createResultPicture();
    backToStartButton.addEventListener('click', showStartPage);
    backToCategoriesButton.addEventListener('click', () => showQuizPage(type));
}

export default showResultPage;
