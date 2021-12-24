import './quiz-page.css';
import showStartPage from '../start-page/show-start-page.js';
import showArtistQuestionPage from '../artist-question-page/show-artist-question-page.js';
import showPictureQuestionPage from '../picture-question-page/show-picture-question-page.js';
import showResultPage from '../result-page/show-result-page.js';
import App from '../../app/index.js';

const body = document.querySelector('body');
const main = document.querySelector('main');
const CATEGORY_IMAGES_COUNT = 12;
const QUESTIONS_COUNT = 10;

function showQuizPage(type) {
    main.innerHTML = `<h2 class="title">Категории</h2>
    <h3 class="title" id="category-title"></h3>
    <div class="categories-wrapper">
        <div class="categories">
        </div>
    </div>
    <div class="button-wrapper">
        <button type="button" class="back-to-start-button">На главную</button>
    </div>`;

    body.style.backgroundImage = 'none';

    const categoryTitle = document.getElementById('category-title');
    if (type === 'findArtist') {
        categoryTitle.innerHTML = 'Угадайте автора картины';
    } else {
        categoryTitle.innerHTML = 'Угадайте картину по автору';
    }

    const categories = document.querySelector('.categories');

    function createCategory() {
        let counter = 1;
        let start = 0;
        let end = CATEGORY_IMAGES_COUNT;
        if (type === 'findPicture') {
            start += CATEGORY_IMAGES_COUNT;
            end += CATEGORY_IMAGES_COUNT;
        }
        for (let i = start; i < end; i++) {
            let counterRightAnswers = 0;
            let counterAnswers = 0;
            let result = '';
            let myButtonImageClass = 'button-grayscale';
            let myButtonShowResultClass = 'button-hide';
            for (let j = 0; j < QUESTIONS_COUNT; j++) {
                if (App.categories[i].questions[j].status === 'right') {
                    counterRightAnswers++;
                    counterAnswers++;
                } else if (App.categories[i].questions[j].status === 'wrong') {
                    counterAnswers++;
                }
            }
            if (counterAnswers) {
                result = `${counterRightAnswers}/${counterAnswers}`;
                myButtonImageClass = '';
                myButtonShowResultClass = '';
            }
            const { imageNum } = App.categories[i].questions[0];
            const image = `url('https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${imageNum}.jpg')`;
            const category = document.createElement('div');
            category.classList.add('category');
            category.innerHTML = `<div class="category-information">${counter}&nbsp;&nbsp;&nbsp;&nbsp;${result}</div>
            <button type="button" class="button-category-image ${myButtonImageClass}" style="background-image:${image}"></button>
            <button type="button" class="show-result ${myButtonShowResultClass}">Смотреть<br>детали</button>`;
            categories.append(category);
            counter++;
        }
    }

    createCategory();

    const buttonCategoryImage = document.querySelectorAll('.button-category-image');
    const backToStartButton = document.querySelector('.back-to-start-button');

    const showResult = document.querySelectorAll('.show-result');

    backToStartButton.addEventListener('click', showStartPage);
    showResult.forEach((item, index) =>
        item.addEventListener('click', () => {
            if (type === 'findArtist') {
                showResultPage(type, index);
            } else {
                showResultPage(type, index + CATEGORY_IMAGES_COUNT);
            }
        })
    );
    buttonCategoryImage.forEach((item, index) =>
        item.addEventListener('click', () => {
            if (type === 'findArtist') {
                showArtistQuestionPage(type, index, 0);
            } else {
                showPictureQuestionPage(type, index + CATEGORY_IMAGES_COUNT, 0);
            }
        })
    );
}

export default showQuizPage;
