import showStartPage from './show-start-page.js';
import showQuizPage from './show-quiz-page.js';
import App from '../app/index.js';
import showResultPage from './show-result-page.js';

const main = document.querySelector('main');

function showPictureQuestionPage(type, index, questionNum) {
    const question = App.categories[index].questions[questionNum];
    const { author, imageNum } = question;
    main.innerHTML = `<h3 class="title">Какую картину написал<br> ${question.author} ?</h3>
    <div class="time-left">У вас осталось 30 секунд для ответа.</div>
    <div class="answers-pictures-quiz-wrapper">
        <button type="button" class="answer-picture-button" style="background-image:url(https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${question.options[0].imageNum}.jpg)" data-isCorrect="${question.options[0].isCorrect}" ></button>
        <button type="button" class="answer-picture-button" style="background-image:url(https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${question.options[1].imageNum}.jpg)" data-isCorrect="${question.options[1].isCorrect}" ></button>
        <button type="button" class="answer-picture-button" style="background-image:url(https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${question.options[2].imageNum}.jpg)" data-isCorrect="${question.options[2].isCorrect}" ></button>
        <button type="button" class="answer-picture-button" style="background-image:url(https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${question.options[3].imageNum}.jpg)" data-isCorrect="${question.options[3].isCorrect}" ></button>
        <div class="window-correct-answer">
            <div class="correct-answer-message"></div>
            <div class="correct-answer-image-with-information">
                <img src="https://raw.githubusercontent.com/darya-startsava/image-data/master/full/${imageNum}full.jpg"
                    alt="тут должна быть картина" class="correct-answer-picture">
                <div class="window-correct-answer-right-block">
                    <div class="correct-answer-information">Автор: ${question.author}<br>
                        name: ${question.name}<br>
                        year: ${question.year}
                    </div>
                    <button type="button" class="continue-button">Продолжить</button>
                </div>
            </div>
        </div>
    </div>
    <div class="buttons-wrapper">
        <button type="button" class="back-to-button" id="back-to-start-button">На главную</button>
        <button type="button" class="back-to-button" id="back-to-categories-button">Категории</button>
    </div>`;

    const answersPicturesQuizWrapper = document.querySelector('.answers-pictures-quiz-wrapper');

    const backToStartButton = document.querySelector('#back-to-start-button');
    const backToCategoriesButton = document.querySelector('#back-to-categories-button');

    const continueButton = document.querySelector('.continue-button');
    const windowCorrectAnswer = document.querySelector('.window-correct-answer');
    const correctAnswerMessage = document.querySelector('.correct-answer-message');

    function showRightAnswerWindow(isCorrect) {
        windowCorrectAnswer.style.display = 'unset';
        if (isCorrect) {
            windowCorrectAnswer.style.backgroundColor = 'var(--right-answer-color)';
            correctAnswerMessage.innerHTML = 'Верно!';
        } else {
            windowCorrectAnswer.style.backgroundColor = 'var(--wrong-answer-color)';
            correctAnswerMessage.innerHTML = 'Неверно.';
        }
    }

    function nextQuestion() {
        windowCorrectAnswer.style.display = 'none';
        if (questionNum == 9) {
            showResultPage();
        } else {
            questionNum++;
            showPictureQuestionPage(type, index, questionNum);
        }
    }

    backToStartButton.addEventListener('click', showStartPage);
    backToCategoriesButton.addEventListener('click', () => showQuizPage(type));
    answersPicturesQuizWrapper.addEventListener('click', (e) => {
        if (e.target.className == 'answer-picture-button') {
            const isCorrect = JSON.parse(e.target.dataset.iscorrect);
            showRightAnswerWindow(isCorrect);
        }
    });
    continueButton.addEventListener('click', nextQuestion);
}

export default showPictureQuestionPage;
