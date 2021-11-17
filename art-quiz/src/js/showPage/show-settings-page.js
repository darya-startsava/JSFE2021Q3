import showStartPage from './show-start-page.js';

const body = document.querySelector('body');
const main = document.querySelector('main');

function showSettingsPage() {
    main.innerHTML = `<h2 class="title">Настройки</h2>
    <div class="settings-items">
        <div class="settings-item">
            <h3>Звук: (вкл)</h3>
            <label class="checkbox">
                <input type="checkbox" id="checkbox-volume">
                <span>вкл/выкл</span>
            </label>
            <div class="settings-range">
                <input type="range" id="range-volume" min="0" max="1" value="0.5" step="0.1">
                <label for="range-volume"></label>
            </div>
        </div>
        <div class="settings-item">
            <h3>Время: (5с)</h3>
            <label class="checkbox">
                <input type="checkbox" id="checkbox-time">
                <span>вкл/выкл</span>
            </label>
            <div class="settings-range">
                <input type="range" id="range-time" min="0" max="30" value="10" step="5">
                <label for="range-time"></label>
            </div>
        </div>
    </div>
    <div class="button-wrapper">
        <button type="button" class="back-to-start-button">На главную</button>
    </div>`;
    body.style.backgroundImage = 'none';

    const backToStartButton = document.querySelector('.back-to-start-button');

    backToStartButton.addEventListener('click', showStartPage);
};

export default showSettingsPage;