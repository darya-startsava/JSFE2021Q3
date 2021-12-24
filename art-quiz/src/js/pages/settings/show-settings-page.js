import './settings.css';
import showStartPage from '../start-page/show-start-page.js';
import App from '../../app/index.js';

const body = document.querySelector('body');
const main = document.querySelector('main');

function showSettingsPage() {
    main.innerHTML = `<h2 class="title">Настройки</h2>
    <div class="settings-items">
        <div class="settings-item">
            <h3>Звук:</h3>
            <label class="checkbox">
                <input type="checkbox" id="checkbox-volume">
                <span>вкл/выкл</span>
            </label>
            <div class="settings-range">
                <input type="range" id="range-volume" min="0" max="1" step="0.1">
                <label for="range-volume"></label>
            </div>
        </div>
        <div class="settings-item">
            <h3 class ='time-text'></h3>
            <label class="checkbox">
                <input type="checkbox" id="checkbox-time">
                <span>вкл/выкл</span>
            </label>
            <div class="settings-range">
                <input type="range" id="range-time" min="5" max="30" step="5">
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

    const checkboxVolume = document.getElementById('checkbox-volume');
    checkboxVolume.checked = JSON.parse(App.settings.isVolume);
    checkboxVolume.addEventListener('change', () => {
        App.settings.isVolume = JSON.stringify(checkboxVolume.checked);
        App.settings.setIsVolume();
    });

    const checkboxTime = document.getElementById('checkbox-time');
    checkboxTime.checked = JSON.parse(App.settings.isTime);
    checkboxTime.addEventListener('change', () => {
        App.settings.isTime = JSON.stringify(checkboxTime.checked);
        App.settings.setIsTime();
    });

    const rangeVolume = document.getElementById('range-volume');
    rangeVolume.value = App.settings.volume;
    rangeVolume.addEventListener('change', () => {
        App.settings.volume = rangeVolume.value;
        App.settings.setVolume();
    });

    const timeText = document.querySelector('.time-text');
    const rangeTime = document.getElementById('range-time');
    rangeTime.value = App.settings.time;
    timeText.innerHTML = `Время: ${App.settings.time} c`;
    rangeTime.addEventListener('change', () => {
        App.settings.time = rangeTime.value;
        App.settings.setTime();
        timeText.innerHTML = `Время: ${App.settings.time} c`;
    });
}

export default showSettingsPage;
