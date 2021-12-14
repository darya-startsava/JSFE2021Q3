import showStartPage from './show-start-page.js';
import showQuizPage from './show-quiz-page.js';
import App from '../app/index.js';

const main = document.querySelector('main');

function showArtistQuestionPage(type, index, questionNum) {
    const question = App.categories[index].questions[questionNum];
    const { imageNum } = question;
    main.innerHTML = `<h3 class="title">Кто автор этой картины?</h3>
<div class="time-left">&nbsp;</div>
<div class="image-author-quiz-wrapper">
    <div class="image-author-quiz" id="image-author-quiz" style="background-image:url(https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${imageNum}.jpg)" ></div>
</div>
<div class="answers-author-quiz-wrapper">
    <button type="button" class="answer-author-button" data-isCorrect="${question.options[0].isCorrect}" >${question.options[0].author}</button>
    <button type="button" class="answer-author-button" data-isCorrect="${question.options[1].isCorrect}" >${question.options[1].author}</button>
    <button type="button" class="answer-author-button" data-isCorrect="${question.options[2].isCorrect}" >${question.options[2].author}</button>
    <button type="button" class="answer-author-button" data-isCorrect="${question.options[3].isCorrect}" >${question.options[3].author}</button>
    <div class="window-correct-answer">
        <div class="correct-answer-message"></div>
        <div class="correct-answer-image-with-information">
            <img src="https://raw.githubusercontent.com/darya-startsava/image-data/master/full/${imageNum}full.jpg"
                alt="тут должна быть картина" class="correct-answer-picture">
            <div class="window-correct-answer-right-block">
                <div class="correct-answer-information">Автор: ${question.author}<br>
                   Название картины: ${question.name}<br>
                    год: ${question.year}
                </div>
                <button type="button" class="continue-button">Продолжить</button>
            </div>
        </div>
    </div>
    <div class="end-quiz-window">
        <div class="end-quiz-message"></div>
        <button type="button" class="back-to-button" id="go-to-categories-button">Продолжить</button>
    </div>
</div>
<div class="buttons-wrapper">
    <button type="button" class="back-to-button" id="back-to-start-button" >На главную</button>
    <button type="button" class="back-to-button" id="back-to-categories-button">Категории</button>
</div>`;

    const answersAuthorQuizWrapper = document.querySelector('.answers-author-quiz-wrapper');

    const backToStartButton = document.querySelector('#back-to-start-button');
    const backToCategoriesButton = document.querySelector('#back-to-categories-button');
    const goToCategoriesButton = document.querySelector('#go-to-categories-button');

    const continueButton = document.querySelector('.continue-button');
    const windowCorrectAnswer = document.querySelector('.window-correct-answer');
    const correctAnswerMessage = document.querySelector('.correct-answer-message');
    const endQuizWindow = document.querySelector('.end-quiz-window');
    const endQuizMessage = document.querySelector('.end-quiz-message');

    const timeLeft = document.querySelector('.time-left');

    let seconds = App.settings.time;
    let intervalId;

    function playSound(source) {
        if (App.settings.isTime === 'true') {
            clearInterval(intervalId);
        }
        const audioElement = new Audio(source);
        if (App.settings.isVolume === 'true') {
            audioElement.volume = App.settings.volume;
        } else {
            audioElement.volume = 0;
        }
        audioElement.play();
    }

    function showRightAnswerWindow(isCorrect) {
        windowCorrectAnswer.style.visibility = 'visible';
        windowCorrectAnswer.style.opacity = 1;
        if (isCorrect) {
            windowCorrectAnswer.style.backgroundColor = 'var(--right-answer-color)';
            correctAnswerMessage.innerHTML = 'Верно!';
            question.setStatus('right');
            playSound('../assets/mp3/right.mp3');
        } else {
            windowCorrectAnswer.style.backgroundColor = 'var(--wrong-answer-color)';
            correctAnswerMessage.innerHTML = 'Неверно.';
            question.setStatus('wrong');
            playSound('../assets/mp3/wrong.mp3');
        }
    }

    if (App.settings.isTime === 'true') {
        intervalId = setInterval(() => {
            timeLeft.innerHTML = `У вас осталось ${seconds} секунд для ответа.`;
            seconds--;
            if (seconds === -1) {
                showRightAnswerWindow(false);
            }
        }, 1000);
    }

    function showEndMessage() {
        endQuizWindow.style.visibility = 'visible';
        endQuizWindow.style.opacity = 1;
        endQuizWindow.style.backgroundColor = 'var(--end-quiz-color)';
        let counter = 0;
        for (const q of App.categories[index].questions) {
            if (q.status === 'right') {
                counter++;
            }
        }
        endQuizMessage.innerHTML = ` Конец игры! <br> Ваш результат:<br> ${counter}/10`;
    }

    function nextQuestion() {
        windowCorrectAnswer.style.display = 'none';
        if (questionNum === 9) {
            showEndMessage();
        } else {
            questionNum++;
            showArtistQuestionPage(type, index, questionNum);
        }
    }

    goToCategoriesButton.addEventListener('click', () => showQuizPage(type));
    backToStartButton.addEventListener('click', () => {
        if (App.settings.isTime === 'true') {
            clearInterval(intervalId);
        }
        showStartPage();
    });
    backToCategoriesButton.addEventListener('click', () => {
        if (App.settings.isTime === 'true') {
            clearInterval(intervalId);
        }
        showQuizPage(type);
    });
    answersAuthorQuizWrapper.addEventListener('click', (e) => {
        if (e.target.className === 'answer-author-button') {
            const isCorrect = JSON.parse(e.target.dataset.iscorrect);
            showRightAnswerWindow(isCorrect);
        }
    });
    continueButton.addEventListener('click', nextQuestion);
}

export default showArtistQuestionPage;
