import {currentLanguage} from './localization-strings.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const quoteAndAuthor = document.querySelector('.quote-and-author');

function getRandomNum() {
    return Math.floor(Math.random() * 20);
};

async function getQuotes() {
    const quotes = `./assets/json/data_${currentLanguage}.json`;
    const res = await fetch(quotes);
    const data = await res.json();
    let quoteNumber = getRandomNum();
    quote.textContent = `${data.quotes[quoteNumber].quote}`;
    author.textContent = `${data.quotes[quoteNumber].author}`;
};

export { changeQuote, quoteAndAuthor, getQuotes };