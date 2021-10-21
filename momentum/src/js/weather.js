const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
const city = document.querySelector('.city');

async function getWeather() {
    if (!city.value) {
        getLocalStorageCity();
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e4f05c638c1d3df262d927daf0594260&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.name) {
        weatherError.textContent = 'Please, enter correct city';
        weatherIcon.className = 'weather-icon owf';
        temperature.textContent ='';
        weatherDescription.textContent ='';
        wind.textContent ='';
        humidity.textContent ='';
    } else {
        weatherError.textContent = '';
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`
        localStorage.setItem('city', city.value);
    }
}

function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
}

function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } else city.value = 'Minsk';
}

export { city, getWeather, getLocalStorageCity, setLocalStorageCity }