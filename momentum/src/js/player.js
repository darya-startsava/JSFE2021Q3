import playList from './playList.js'

const playButton = document.querySelector('.play-button');
const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const timeline = document.querySelector('.timeline');
const volume = document.querySelector('.volume');
const volumePercentage = document.querySelector('.volume-percentage');
const soundButton = document.querySelector('.sound');
let playItems;
const player = document.querySelector('.player');



const audio = new Audio();



let isPlay = false;
let playNum = 0;

function createPlayList() {
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = `${playList[i].title} | ${playList[i].duration}`;
        playListContainer.append(li);
    }
    playItems = document.querySelectorAll('.play-item');
}

function playPrev() {
    isPlay = false;
    if (playNum == 0) {
        playNum = playList.length - 1;
    } else {
        playNum -= 1;
    }
    playAudio();
};

function playNext() {
    isPlay = false;
    if (playNum == playList.length - 1) {
        playNum = 0;
    } else {
        playNum += 1;
    }
    playAudio();
};

function changePlayIcon() {
    if (!isPlay) {
        playButton.classList.add('pause');
        playButton.classList.remove('play');
        isPlay = true;
    } else {
        playButton.classList.add('play');
        playButton.classList.remove('pause');
        isPlay = false;
    }
}

function highlightActiveTrack() {
    const li = document.querySelectorAll('.play-item');
    li.forEach(item => {
        item.classList.remove('item-active');
        item.classList.remove('paused-item')
    });
    li[playNum].classList.add('item-active');
    if (!isPlay) {
        li[playNum].classList.remove('paused-item');
    } else {
        li[playNum].classList.add('paused-item');
    }
}

function playAudio() {
    changePlayIcon();
    if (isPlay) {
        audio.src = playList[playNum].src;
        audio.play();
    } else {
        audio.pause();
    }
    highlightActiveTrack();
}

function changeTrackInformation() {
    const length = document.querySelector('.length');
    const name = document.querySelector('.track-name');
    length.textContent = `${playList[playNum].duration}`;
    name.textContent = `${playList[playNum].title}`

}

function updateCurrentTime() {
    const current = document.querySelector('.current');
    const progressBar = document.querySelector('.progress');
    let s = parseInt(audio.currentTime % 60);
    let m = parseInt((audio.currentTime / 60) % 60);
    current.innerHTML = m.toString().padStart(2, 0) + ':' + s.toString().padStart(2, 0);
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
}

function changeTrackPoint(event) {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const playPoint = event.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = playPoint;
}

function changeVolume(event) {
    const volumeWidth = window.getComputedStyle(volume).width;
    const newVolume = event.offsetX / parseInt(volumeWidth);
    audio.volume = newVolume;
    volumePercentage.style.width = newVolume * 100 + '%';
};

function onOffSound() {
    if (audio.volume || !(audio.muted)) {
        audio.muted = true;
        audio.volume = 0;
        volumePercentage.style.width = 0;
        soundButton.classList.remove('sound-on');
        soundButton.classList.add('sound-off');
    } else {
        audio.muted = false;
        audio.volume = .5;
        volumePercentage.style.width = 50 + '%';
        soundButton.classList.remove('sound-off');
        soundButton.classList.add('sound-on');
    }
}

function playWithOwnButton(item, index) {
    if (!item.classList.contains('paused-item')) {
        playItems.forEach(item => { item.classList.remove('paused-item') })
        item.classList.add('paused-item');
        playNum = index;
        isPlay = false;
        playAudio();
    } else {
        item.classList.remove('paused-item');
        playAudio();
    }
}



export {
    audio, playNum, isPlay, player, playButton, playPrevButton, playNextButton,
    createPlayList, highlightActiveTrack, playAudio, playPrev, playNext,
    changeTrackInformation, updateCurrentTime, timeline, volume, changeTrackPoint,
    changeVolume, soundButton, onOffSound, playWithOwnButton, playItems
};
