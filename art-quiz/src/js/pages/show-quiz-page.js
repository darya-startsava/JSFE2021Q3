import showStartPage from './show-start-page.js';
import showArtistQuestionPage from './show-artist-question-page.js';
import showPictureQuestionPage from './show-picture-question-page.js';
import showResultPage from './show-result-page.js';
import App from '../app/index.js';

const body = document.querySelector('body');
const main = document.querySelector('main');

function showQuizPage(type) {
    main.innerHTML = `<h2 class="title">Категории</h2>
    <div class="categories-wrapper">
        <div class="categories">
        </div>
    </div>
    <div class="button-wrapper">
        <button type="button" class="back-to-start-button">На главную</button>
    </div>`;

    body.style.backgroundImage = `none`;

    const categories = document.querySelector('.categories');

    function createCategory(type) {
        let counter = 1;
        let start = 0;
        let end = 12;
        if (type == 'findPicture') {
            start += 12;
            end += 12;
        }
        for (let i = start; i < end; i++) {
            const { imageNum } = App.categories[i].questions[0];
            const image = `url('https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${imageNum}.jpg')`;
            const category = document.createElement('div');
            category.classList.add('category');
            category.innerHTML = `<div class="category-information">${counter}&nbsp;&nbsp;&nbsp;&nbsp;10/10</div>
            <button type="button" class="button-category-image" style="background-image:${image}"></button>
            <button type="button" class="show-result">Смотреть<br>детали</button>`;
            categories.append(category);
            counter++;
        }
    }
    createCategory(type);

    const buttonCategoryImage = document.querySelectorAll(
        '.button-category-image'
    );
    const backToStartButton = document.querySelector('.back-to-start-button');
    
    // TO DO!! Realise showRresult

    const showResult = document.querySelectorAll('.show-result');

    backToStartButton.addEventListener('click', showStartPage);
    showResult.forEach((item) =>
        item.addEventListener('click', () => showResultPage(type))
    );
    buttonCategoryImage.forEach((item, index) =>
        item.addEventListener('click', () => {
            if (type == 'findArtist') {
                showArtistQuestionPage(type, index, 0);
            } else {
                showPictureQuestionPage(type, index+12, 0);
            }
        })
    );
}

export default showQuizPage;
