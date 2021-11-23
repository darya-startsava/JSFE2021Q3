import showStartPage from './show-start-page.js';
import showQuizPage from './show-quiz-page.js';
import App from '../app/index.js';

const main = document.querySelector('main');

function showResultPage(type, index) {
    main.innerHTML = `<h3 class="title">Результаты раунда:</h3>
    <div class="result"></div>
    <div class="results-wrapper">
        <div class="results"></div>
        <div class="about-picture">
        <div class="correct-answer-image-with-information">
            <img alt="тут должна быть картина" class="about-picture-image">
            <div class="window-about-picture-right-block">
                <div class="correct-answer-information">
                </div>
                
                
                <button type="button" class="hide-about-picture-button">Cкрыть</button>
                </div>
                </div>
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
            const { imageNum, author, name, year } = App.categories[index].questions[i];
            const image = `url('https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${imageNum}.jpg')`;
            const resultPictureButton = document.createElement('button');
            resultPictureButton.dataset.num = imageNum;
            resultPictureButton.dataset.aut = author;
            resultPictureButton.dataset.name = name;
            resultPictureButton.dataset.year = year;
            resultPictureButton.classList.add('result-picture-button');
            resultPictureButton.classList.add('button-grayscale');
            if (App.categories[index].questions[i].status === 'right') {
                counterRightAnswers++;
                resultPictureButton.classList.remove('button-grayscale');
            }
            result.innerHTML = `${counterRightAnswers}/10`;
            resultPictureButton.style.backgroundImage = `${image}`;
            results.append(resultPictureButton);
        }
    }

    const aboutPicture = document.querySelector('.about-picture');
    const aboutPictureImage = document.querySelector('.about-picture-image');
    const correctAnswerInformation = document.querySelector('.correct-answer-information');

    function showInformation(num, aut, name, year) {
        aboutPicture.style.visibility = 'visible';
        aboutPicture.style.opacity = 1;
        aboutPictureImage.src = `https://raw.githubusercontent.com/darya-startsava/image-data/master/full/${num}full.jpg`;
        correctAnswerInformation.innerHTML = `${aut}<br>
        ${name}<br>
        ${year}`;
    }

    const hideAboutPictureButton = document.querySelector('.hide-about-picture-button');
    function hideInformation() {
        aboutPicture.style.visibility = 'hidden';
        aboutPicture.style.opacity = 0;
    }
    hideAboutPictureButton.addEventListener('click', hideInformation);

    createResultPicture();
    backToStartButton.addEventListener('click', showStartPage);
    backToCategoriesButton.addEventListener('click', () => showQuizPage(type));
    results.addEventListener('click', (e) => {
        if (
            e.target.className === 'result-picture-button' ||
            e.target.className === 'result-picture-button button-grayscale'
        ) {
            const num = JSON.parse(e.target.dataset.num);
            const aut = e.target.dataset.aut;
            const name = e.target.dataset.name;
            const year = e.target.dataset.year;
            showInformation(num, aut, name, year);
        }
    });
}

export default showResultPage;
