const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

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

function showGreeting() {
    greeting.textContent = `Good ${getTimeOfDay()},`;
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}


export { getTimeOfDay, showGreeting, setLocalStorage, getLocalStorage };