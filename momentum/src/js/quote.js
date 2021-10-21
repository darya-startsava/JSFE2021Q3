const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

function getRandomNum() {
    return Math.floor(Math.random() * 102) + 1;
};

async function getQuotes() {
    const quotes = './assets/json/data.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let quoteNumber = getRandomNum();
    quote.textContent = `${data.quotes[quoteNumber].quote}`;
    author.textContent = `${data.quotes[quoteNumber].author}`;
};

export { changeQuote, getQuotes };