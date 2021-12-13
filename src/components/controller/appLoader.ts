import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '90f172be91244209ba0690f7a59afce3', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
