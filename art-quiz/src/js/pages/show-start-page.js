import showArtistQuizPage from './show-artist-quiz-page.js';
import showPictureQuizPage from './show-picture-quiz-page.js';
import showSettingsPage from './show-settings-page.js';

const body = document.querySelector('body');
const main = document.querySelector('main');

function showStartPage() {
    main.innerHTML = `<section class="start-page">
    <div class="start-page-wrapper">
        <button type="button" class="settings"></button>
        <div class="art-quiz-logo"></div>
        <div class="start-buttons">
            <button type="button" class="start-button button-artist-quiz">Угадать художника</button>
            <button type="button" class="start-button button-art-quiz">Угадать картину</button>
        </div>
    </div>
</section>`
    body.style.backgroundImage = `url('./assets/img/j-retrato-de-cardenal-rafael.png')`;
    const buttonArtistQuiz = document.querySelector('.button-artist-quiz');
    const buttonArtQuiz = document.querySelector('.button-art-quiz');
    const settings = document.querySelector('.settings');

    buttonArtistQuiz.addEventListener('click', showArtistQuizPage);
    buttonArtQuiz.addEventListener('click', showPictureQuizPage);
    settings.addEventListener('click', showSettingsPage)


}

export default showStartPage;