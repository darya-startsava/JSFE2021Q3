const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

function getTimeOfDay() {
    const date = new Date;
    const hour = date.getHours();
    switch (Math.floor(hour / 6)) {
        case 1:
            return 'Good morning,';
        case 2:
            return 'Good afternoon,';
        case 3:
            return 'Good evening,';
        case 0:
            return 'Good night,';
    }
}

function showGreeting() {
    greeting.textContent = getTimeOfDay();
}

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}


export { showGreeting, setLocalStorage, getLocalStorage };