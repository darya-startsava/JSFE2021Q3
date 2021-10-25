const body = document.querySelector('.body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
export let currentBackground = localStorage.getItem('background') || 'gitHub';


function getRandomNum() {
    return Math.floor(Math.random() * 20) + 1;
}
let randomNum = getRandomNum();
let bgNum = randomNum.toString().padStart(2, 0);

function getTimeOfDay() {
    const date = new Date;
    const hour = date.getHours();
    switch (Math.floor(hour / 6)) {
        case 1:
            return 'morning';
        case 2:
            return 'afternoon';
        case 3:
            return 'evening';
        case 0:
            return 'night';
    }
}

function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/darya-startsava/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg`
    img.onload = () => {
        body.style.backgroundImage = `url(${img.src})`;
    };
}

function getSlideNext() {
    if (randomNum == 20) {
        bgNum = '01';
    } else {
        bgNum = (randomNum + 1).toString().padStart(2, 0);
    }
    randomNum = +bgNum;
    setBg();
};


function getSlidePrev() {
    if (randomNum == 1) {
        bgNum = '20';
    } else {
        bgNum = (randomNum - 1).toString().padStart(2, 0);
    }
    randomNum = +bgNum;
    setBg();
};

export { slideNext, slidePrev, setBg, getSlideNext, getSlidePrev };






