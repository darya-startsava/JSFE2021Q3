import showStartPage from './show-start-page.js';
import showArtistQuestionPage from './show-artist-question-page.js';
import showResultPage from './show-result-page.js';

const body = document.querySelector('body');
const main = document.querySelector('main');

function showArtistQuizPage() {
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

    function createCategory() {
        let counter = 1;
        for (let i = 0; i <= 119; i = i + 10) {
            let image = `url('https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${i}.jpg')`;
            const category = document.createElement('div');
            category.classList.add('category');
            category.innerHTML = `<div class="category-information">${counter}&nbsp;&nbsp;&nbsp;&nbsp;10/10</div>
            <button type="button" class="button-category-image" style="background-image:${image}"></button>
            <button type="button" class="show-result">Смотреть<br>детали</button>`;
            categories.append(category);
            counter++;
        }
    }
    createCategory();

    const buttonCategoryImage = document.querySelectorAll('.button-category-image');
    const backToStartButton = document.querySelector('.back-to-start-button');
    const showResult = document.querySelectorAll('.show-result');




    backToStartButton.addEventListener('click', showStartPage);
    showResult.forEach(item => item.addEventListener('click', showResultPage));
    buttonCategoryImage.forEach(item => item.addEventListener('click', showArtistQuestionPage));

}

export default showArtistQuizPage;
