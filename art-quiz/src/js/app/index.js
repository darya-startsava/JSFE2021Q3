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

        const CATEGORY_IMAGES_COUNT = 12;
        const QUESTIONS_COUNT = 10;

        const createCategories = (type) => {
            let start = 0;
            let end = CATEGORY_IMAGES_COUNT;
            if (type === 'findPicture') {
                start += CATEGORY_IMAGES_COUNT;
                end += CATEGORY_IMAGES_COUNT;
            }
            for (let i = start; i < end; i++) {
                const category = new Category();
                this.categories.push(category);
                for (let j = 0; j < QUESTIONS_COUNT; j++) {
                    const { author, name, year, imageNum } = data[i * QUESTIONS_COUNT + j];
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
                    // Math.floor(Math.random() * (max - min + 1) + min)
                    const ANSWERS_COUNT = 4;
                    const LAST_QUESTION_NUMBER = data.length - 2;
                    while (question.options.length < ANSWERS_COUNT) {
                        const randomNumber = Math.floor(Math.random() * (LAST_QUESTION_NUMBER + 1));
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
