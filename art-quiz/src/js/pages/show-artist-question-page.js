import showStartPage from './show-start-page.js';
import showArtistQuizPage from './show-artist-quiz-page.js';

const main = document.querySelector('main');

function showArtistQuestionPage() {
    main.innerHTML = `<h3 class="title">Кто автор этой картины?</h3>
<div class="time-left">У вас осталось 30 секунд для ответа.</div>
<div class="image-author-quiz-wrapper">
    <div class="image-author-quiz" id="image-author-quiz"></div>
</div>
<div class="answers-author-quiz-wrapper">
    <button type="button" class="answer-author-button answer-1-author-button">Николай Богданов-Бельский</button>
    <button type="button" class="answer-author-button answer-2-author-button">Ван Гог</button>
    <button type="button" class="answer-author-button answer-3-author-button">Николай Богданов-Бельский</button>
    <button type="button" class="answer-author-button answer-4-author-button">Николай Богданов-Бельский</button>
    <div class="window-correct-answer">
        <div class="correct-answer-message">Неверно.</div>
        <div class="correct-answer-image-with-information">
            <img src="https://raw.githubusercontent.com/darya-startsava/image-data/master/full/100full.jpg"
                alt="тут должна быть картина" class="correct-answer-picture">
            <div class="window-correct-answer-right-block">
                <div class="correct-answer-information">author: 'Иероним Босх'<br>
                    name: 'Страшный суд'<br>
                    year: '1504'
                </div>
                <button type="button" class="continue-button">Продолжить</button>
            </div>
        </div>
    </div>
</div>
<div class="buttons-wrapper">
    <button type="button" class="back-to-button" id="back-to-start-button" >На главную</button>
    <button type="button" class="back-to-button" id="back-to-categories-button">Категории</button>
</div>`;

    const backToStartButton = document.querySelector('#back-to-start-button');
    const backToCategoriesButton = document.querySelector('#back-to-categories-button');
    const answerAuthorButton = document.querySelectorAll('.answer-author-button');
    const continueButton = document.querySelector('.continue-button');
    const windowCorrectAnswer = document.querySelector('.window-correct-answer');

    function showRightAnswerWindow() {
        windowCorrectAnswer.style.display = 'unset';
    };

    function nextQuestion() {
        windowCorrectAnswer.style.display = 'none';
    };

    backToStartButton.addEventListener('click', showStartPage);
    backToCategoriesButton.addEventListener('click', showArtistQuizPage);
    answerAuthorButton.forEach(item => item.addEventListener('click', showRightAnswerWindow));
    continueButton.addEventListener('click', nextQuestion);
}

export default showArtistQuestionPage;