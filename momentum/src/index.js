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
import {inputShowTime, toggleTimeWidget, translateSettings} from './js/settings.js';


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





