import playList from './playList.js'

const playButton = document.querySelector('.play-button');
const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
const audio = new Audio();


let isPlay = false;
let playNum = 0;

function createPlayList() {
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = `${playList[i].title}`;
        playListContainer.append(li);
    }
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
    li.forEach(item => item.classList.remove('item-active'));
    li[playNum].classList.add('item-active');
}

function playAudio() {
    highlightActiveTrack();
    changePlayIcon();
    if (isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
    } else {
        audio.pause();
    }
}

export { playNum, isPlay, playButton, playPrevButton, playNextButton, createPlayList, highlightActiveTrack, playAudio, playPrev, playNext };
