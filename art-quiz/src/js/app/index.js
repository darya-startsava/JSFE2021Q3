import Settings from './settings.js';
import Category from './category.js';
import Question from './question.js';
import Option from './option.js';

class App {
    constructor() {
        this.settings = Settings;
        this.categories = [];
    }

    async buildState() {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        function preloadImage(url) {
            const img = new Image();
            img.src = url;
        }

        const imageInformation = '../assets/json/images-information.json';
        const res = await fetch(imageInformation);
        const data = await res.json();

        // preload images
        data.forEach(({ imageNum }) => {
            const full = `https://raw.githubusercontent.com/darya-startsava/image-data/master/full/${imageNum}full.jpg`;
            const partial = `https://raw.githubusercontent.com/darya-startsava/image-data/master/img/${imageNum}.jpg`;
            preloadImage(full);
            preloadImage(partial);
        });

        const createCategories = (type) => {
            let start = 0;
            let end = 12;
            if (type === 'findPicture') {
                start += 12;
                end += 12;
            }
            for (let i = start; i < end; i++) {
                const category = new Category();
                this.categories.push(category);
                for (let j = 0; j < 10; j++) {
                    const { author, name, year, imageNum } = data[i * 10 + j];
                    const question = new Question(imageNum);
                    category.questions.push(question);
                    question.type = type;
                    if (question.type === 'findAuthor') {
                        question.title = 'Кто автор этой картины?';
                    } else {
                        question.title = `Какую из этих картин написал ${author}?`;
                    }
                    const option = new Option(imageNum, author, name, year, true);
                    question.options.push(option);
                    question.author = option.author;
                    question.name = option.name;
                    question.year = option.year;

                    while (question.options.length < 4) {
                        const randomNumber = Math.floor(Math.random() * 240);
                        const { author, name, year, imageNum } = data[randomNumber];
                        const isUniq = question.options.every((o) => o.author !== author && o.imageNum !== imageNum);
                        if (isUniq) {
                            const option = new Option(imageNum, author, name, year, false);
                            question.options.push(option);
                        }
                    }
                    shuffleArray(question.options);
                }
            }
        };
        createCategories('findAuthor');
        createCategories('findPicture');
    }
}

export default new App();
