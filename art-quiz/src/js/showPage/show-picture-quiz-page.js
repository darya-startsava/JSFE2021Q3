import showStartPage from './show-start-page.js';
import showPictureQuestionPage from './show-picture-question-page.js';
import showResultPage from './show-result-page.js';

const body = document.querySelector('body');
const main = document.querySelector('main');

function showPictureQuizPage() {
    main.innerHTML = `        <h2 class="title">Категории</h2>
    <div class="categories-wrapper">
        <div class="categories">
            <div class="category">
                <div class="category-information">01&nbsp;&nbsp;&nbsp;&nbsp;10/10</div>
                <button type="button" class="button-category-image" id="category-image-01"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">02&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-02"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">03&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-03"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">04&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-04"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">05&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-05"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">06&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-06"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">07&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-07"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">08&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-08"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">09&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-09"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">10&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-10"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">11&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-11"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
            <div class="category">
                <div class="category-information">12&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <button type="button" class="button-category-image" id="category-image-12"></button>
                <button type="button" class="show-result">Смотреть<br>детали</button>
            </div>
        </div>
    </div>
    <div class="button-wrapper">
        <button type="button" class="back-to-start-button">На главную</button>
    </div>`
    body.style.backgroundImage = `none`;
    const backToStartButton = document.querySelector('.back-to-start-button');
    const showResult = document.querySelectorAll('.show-result');
    const buttonCategoryImage = document.querySelectorAll('.button-category-image');

    backToStartButton.addEventListener('click', showStartPage);
    showResult.forEach(item => item.addEventListener('click', showResultPage));
    buttonCategoryImage.forEach(item => item.addEventListener('click', showPictureQuestionPage));
}

export default showPictureQuizPage;