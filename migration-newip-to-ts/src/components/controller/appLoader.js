import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '90f172be91244209ba0690f7a59afce3', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
