import { showTime } from './js/clock.js';
import { setLocalStorage, getLocalStorage } from './js/greeting.js';
import { slideNext, slidePrev, setBg, getSlideNext, getSlidePrev } from './js/background.js';
import { city, getWeather, getWeatherOnLoad, getLocalStorageCity, setLocalStorageCity } from './js/weather.js';
import { changeQuote, getQuotes } from './js/quote.js';
import {
    audio, playNum, isPlay, playButton, playPrevButton, playNextButton,
    createPlayList, highlightActiveTrack, playAudio, playPrev, playNext,
    changeTrackInformation, updateCurrentTime, timeline, volume, changeTrackPoint,
    changeVolume, soundButton, onOffSound, playWithOwnButton, playItems
} from './js/player.js';
import { inputsLanguage, changeLanguageRadiobutton } from './js/localization-strings.js';
import {
    inputShowTime, inputShowDate, inputShowGreeting, inputShowQuote, inputShowWeather,
    inputShowPlayer, toggleTimeWidget, toggleDateWidget, toggleGreetingWidget,
    toggleQuoteWidget, toggleWeatherWidget, togglePlayerWidget, translateSettings,
    setLocalStorageSettings, getLocalStorageSettings, buttonClose, settingsClose, buttonSettings, showSettings
} from './js/settings.js';
import { inputsBackground, chooseBackground, tagButton, setTag } from './js/background-api.js'

showTime();
window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);
setBg();
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
getWeatherOnLoad();
city.addEventListener('change', getWeather);
window.addEventListener('beforeunload', setLocalStorageCity);
window.addEventListener('load', getLocalStorageCity);
getQuotes();
changeQuote.addEventListener('click', getQuotes);
createPlayList();
highlightActiveTrack();
playButton.addEventListener('click', playAudio);
playPrevButton.addEventListener('click', playPrev);
playNextButton.addEventListener('click', playNext);
audio.addEventListener('loadeddata', changeTrackInformation);
audio.addEventListener('timeupdate', updateCurrentTime);
timeline.addEventListener("click", changeTrackPoint);
volume.addEventListener('click', changeVolume);
soundButton.addEventListener('click', onOffSound);
audio.addEventListener('ended', playNext);
playItems.forEach((item, index) => { item.addEventListener('click', () => playWithOwnButton(item, index)) });
inputsLanguage.forEach((item, index) => { item.addEventListener('change', () => changeLanguageRadiobutton(item, index)) });
window.addEventListener('load', translateSettings);
inputShowTime.addEventListener('change', toggleTimeWidget);
inputShowDate.addEventListener('change', toggleDateWidget);
inputShowGreeting.addEventListener('change', toggleGreetingWidget);
inputShowQuote.addEventListener('change', toggleQuoteWidget);
inputShowWeather.addEventListener('change', toggleWeatherWidget);
inputShowPlayer.addEventListener('change', togglePlayerWidget);
window.addEventListener('beforeunload', setLocalStorageSettings);
window.addEventListener('load', getLocalStorageSettings);
inputsBackground.forEach((item) => { item.addEventListener('change', () => chooseBackground(item)) });
tagButton.addEventListener('click', setTag);
buttonClose.addEventListener('click', settingsClose);
buttonSettings.addEventListener('click', showSettings);






