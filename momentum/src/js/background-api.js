import { getTimeOfDay } from './background.js';

export const inputsBackground = document.querySelectorAll('.input-background');
const inputTag = document.querySelector('.input-tag');
export const tagButton = document.querySelector('.tag-button');

export function setTag() {
    localStorage.setItem('tag', inputTag.value);
    location.reload();
}

function getTag() {
    return localStorage.getItem('tag') || getTimeOfDay();
}

let cache;

export async function getBackgroundFlickr() {
    if (cache) {
        return cache;
    }
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=0a3c1aa40332f267905f613aa3ba03a3&tags=${getTag()}&extras=url_h&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    cache = data.photos.photo.map(item => item.url_h);
    return cache;
}

export async function getBackgroundUnsplash() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTag()}&client_id=LztCpwZQCzKzCqmYmmepdMAk62i7H1--9jGvFwt0Ua0`;
    const res = await fetch(url);
    const data = await res.json();
    return data.urls.full;
}

export function chooseBackground (item) {
    localStorage.setItem('background', `${item.value}`);
    location.reload();
}
